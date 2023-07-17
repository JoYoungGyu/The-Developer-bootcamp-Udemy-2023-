const express = require('express');
const app = express();
const path = require('path') //절대경로를 사용하는지 확인하게 해주는 것
const methodOverride = require('method-override');
const { v4: uuid } = require('uuid');
uuid(); // ⇨ '1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed'

app.use(express.urlencoded({extended : true}));
app.use(express.json());
app.use(methodOverride('_method'));
app.set('view engine','ejs');
app.set('views', path.join(__dirname,'views'))

//댓글 목록 랜더링
let comments = [
    {   id: uuid(),
        username : 'Todd',
        comment : 'lol that is so funny'
    },
    {   id: uuid(),
        username : 'Skyler',
        comment : 'I like to go birdwatching with my dog'
    },
    {   id: uuid(),
        username : 'sk8ber',
        comment : 'Plz delete your account'
    },
    {   id: uuid(),
        username : 'only',
        comment : 'woof woof woof'
    }
]
//comments가 기본 경로가 될 것이다 
//리소스에 대한 기본 URL

app.get('/comments', (req,res)=>{
    res.render('comments/index',{comments});    //꼭 index라 할 필요는 없음
})

// 댓글을 추가하는 부분을 만들것인데 그러면 라우트가 2개 필요
// 1개는 폼 자제 역할을 한다. 종종 그 라우트를 new라고한다.
app.get('/comments/new', (req,res)=>{
    //폼을 보여주는 라우트
    res.render('comments/new');
})

app.post('/comments', (req,res)=>{
    const {username, comment} = req.body;
    comments.push({username,comment, id:uuid()});
    res.redirect('/comments');
    //res.send("IT WORKED!");
})


app.get('/comments/:id', (req,res)=>{
    const { id } = req.params;
    const comment = comments.find(c => c.id == id)
    res.render('comments/show',{comment}) //show.ejs에서 이제 comment를 액세스할 수 있다.
})

//여기서는 빈폼 말고 미리액세스해 폼에 데이터를 적어둘려고 하는 것
app.get('/comments/:id/edit',(req,res)=>{
    const { id } = req.params;
    const comment = comments.find(c => c.id == id)
    res.render('comments/edit', {comment})
})

app.patch('/comments/:id' , (req,res)=>{
    const { id } = req.params;
    const newCommentText = req.body.comment;
    const foundComment = comments.find(c => c.id == id);
    foundComment.comment = newCommentText; // 구문 업데이트하는 곳인듯
    res.redirect('/comments') 
})

app.delete('/comments/:id', (req,res)=>{
    const { id } = req.params;
    comments = comments.filter(c=> c.id !== id);
    //배열을 새로 만드는 방법인듯
    //새로운 배열을 반환하고 기존 댓글 배열을 업데이트 하지 않는다.
    // 댓글 변수를 업데이트해서 구버전의 댓글을 기반으로 댓글을 삭제
    res.redirect('/comments');
})

app.listen(3000, ()=>{
    console.log('ON PORT 3000!');

});


