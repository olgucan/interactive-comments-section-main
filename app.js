
document.addEventListener("DOMContentLoaded",()=> {

let mydiv=document.querySelector("#first").firstElementChild
console.log(mydiv)

let first=document.querySelector("#first")
// let clone = mydiv.cloneNode(true);
 const userNames={}       
        
//first.appendChild(clone)




let data=fetch("data.json")

.then(data=>data.json())
.then(item => {
    //console.log(item.comments)
    for (let i of item.comments){
        userNames[i.user.username]=i.id
        //console.log(i.replies)
       let cloneddiv =document.createElement("div")
       cloneddiv.classList.add("container")
       cloneddiv.setAttribute("id",`${i.user.username}`)
       cloneddiv.classList.add("mt-3")
       cloneddiv.innerHTML=`
       <div class="row ">
       <div class="col-md-7 offset-md-2 myrow">
         <div class="row flex-column-reverse flex-md-row">
          <div class="col-md-1 d-flex justify-content-around align-content-center">
            <div class="rectangle">
            <a  ><img src="./images/icon-plus.svg" alt=""  class="plusimg"></a>  
              <p class="plusp">${i.score}</p>
             <a ><img src="./images/icon-minus.svg" alt="" class="minusimg" ></a> 
            </div>
            <div class="d-block d-sm-none "><img src="./images/icon-reply.svg" alt="" class="mr-2 replyimg"><span class='replyimg'>Reply</span></div>
         </div>
         <div class="col-md-11 px-5">
              <div class="d-flex justify-content-between align-items-center">
                 <div><img src="${i.user.image.png}" alt="" class="avatar"> <span class="px-3"><b>${i.user.username}</b>  </span> <span class="text-muted">${i.createdAt}</span></div>
                 <div class="d-none d-sm-block "><img src="./images/icon-reply.svg" alt="" class="mr-2 replyimg"><span class='replyimg'>Reply</span></div>
              </div>
              <div class="pt-3">
                <p class="text-muted">${i.content}</p>
              </div>
         </div>
         </div>
       </div>
    </div>`   
    first.appendChild(cloneddiv)
    if (i.replies.length>0){
       i.replies.forEach(element => {
        userNames[element.user.username]=element.id
        let replydiv=document.createElement("div")
        replydiv.classList.add("container")
        replydiv.setAttribute("id",`${element.user.username}`)
        replydiv.classList.add("mt-3")
        replydiv.innerHTML=`  <div class="row comment">
        <div class="col-md-6 offset-md-3 myrow ">
          <div class="row flex-column-reverse flex-md-row">
           <div class="col-md-1 d-flex justify-content-around align-content-center">
             <div class="rectangle">
             <a  ><img src="./images/icon-plus.svg" alt="" class='plusimg' ></a>  
               <p class="plusp">${element.score}</p>
              <a  ><img src="./images/icon-minus.svg" alt="" class='minusimg'></a> 
             </div>
             <div class="d-block d-sm-none "><img src="./images/icon-reply.svg" alt="" class="mr-2 replyimg2"><span class='replyimg2'>Reply</span></div>
          </div>
          <div class="col-md-11 px-5">
               <div class="d-flex justify-content-between align-items-center">
                  <div><img src="${element.user.image.png}" alt="" class="avatar"> <span class="px-3"><b>${element.user.username}</b>  </span> <span class="text-muted">${i.createdAt}</span></div>
                  <div class="d-none d-sm-block "><img src="./images/icon-reply.svg" alt="" class="mr-2 replyimg2"><span class='replyimg2'>Reply</span></div>
               </div>
               <div class="pt-3">
                 <p class="text-muted">@${element.replyingTo} ${element.content}</p>
               </div>
          </div>
          </div>
        </div>
     </div>`  
       first.appendChild(replydiv) 
       });
    }
         
    }

   

    let alldivs=document.querySelectorAll(".container")
    alldivs.forEach(item => {
        
        item.addEventListener("click",(e)=> {
            //console.log(e.target.parentNode)
            if (e.target.classList.contains("replyimg") && item.children.length<=1 ){
                console.log("found")
                let mypersonalreply=document.createElement("div")
                mypersonalreply.classList.add("container")
                mypersonalreply.classList.add("mt-3")
                mypersonalreply.innerHTML=`    <div class="row ">
                <div class="col-md-6 offset-md-3 d-flex justify-content-around">
                 
                   <div><img src="./images/avatars/olgu.jpg" alt="" class="avatar">  </div>
                    
                  
                 
                 
                  <button class='btn btn-primary replybuton'>REPLY</button> 
                
                 
                </div>
             </div>`

             let myreplyinput=document.createElement("input")
             myreplyinput.value='@'+item.id
             myreplyinput.classList.add("myform")
             mypersonalreply.childNodes[1].childNodes[1].insertBefore( myreplyinput ,mypersonalreply.childNodes[1].childNodes[1].childNodes[3])
             e.currentTarget.appendChild(mypersonalreply)
            //  setTimeout(()=> {
            //     item.removeChild(mypersonalreply)
            //  },60000)
             mypersonalreply.addEventListener("click",(e)=> {
               if (e.target.classList.contains("replybuton")){
                  item.removeChild(item.children[1])
                  let mypersonalreply2=document.createElement("div")
                  mypersonalreply2.classList.add("container")
                  mypersonalreply2.classList.add("mt-3")
                  mypersonalreply2.innerHTML=` <div class="row comment">
                  <div class="col-md-6 offset-md-3 myrow ">
                    <div class="row flex-column-reverse flex-md-row">
                     <div class="col-md-1 d-flex justify-content-around align-content-center">
                       <div class="rectangle">
                       <a  ><img src="./images/icon-plus.svg" alt="" class='plusimg'></a>  
                         <p class="plusp">0</p>
                        <a  ><img src="./images/icon-minus.svg" alt="" class='minusimg'></a> 
                       </div>
                       <div class="d-block d-sm-none "><img src="./images/icon-delete.svg" alt="" class="mr-2 delete"><span class='delete'>Delete</span>
                       <img src="./images/icon-edit.svg" alt="" class="mr-2 edit"><span class='edit'>Edit</span></div>
                    </div>
                    <div class="col-md-11 px-5 insertedit">
                         <div class="d-flex justify-content-between align-items-center">
                            <div><img src="./images/avatars/olgu.jpg" alt="" class="avatar"> <span class="px-3"><b>Olgu Can</b>  </span> <span class="text-muted">now</span></div>
                            <div class="d-none d-sm-block "><img src="./images/icon-delete.svg" alt="" class="mr-2 delete"><span class='delete'>Delete</span>
                            <img src="./images/icon-edit.svg" alt="" class="mr-2 edit"><span class='edit'>Edit</span></div>
                         </div>
                         <div class="pt-3">
                           <p class="text-muted ">${myreplyinput.value}</p>
                           <input class='d-none' value='${myreplyinput.value}'>
                         </div>
                    </div>
                    </div>
                  </div>
               </div>`
               item.appendChild(mypersonalreply2)

               mypersonalreply2.addEventListener("click",(e)=> {
                  if (e.target.classList.contains("delete")){
                     let myfixeddiv =document.createElement("div")
                     myfixeddiv.className="myfixeddiv"
                     let uyari =document.createElement("div")
                     uyari.classList.add("uyari")
                     uyari.innerHTML=`<h1>Delete Comment</h1><p>Are you sure you want to delete this comment?This will 
                  remove the comment and can't be undone </p> <button class='btn btn-dark'>NO,CANCEL </button>
                     <button class='btn btn-danger ml-2'>YES,DELETE </button>`
                     myfixeddiv.appendChild(uyari)
                     document.body.appendChild(myfixeddiv)
                     myfixeddiv.addEventListener("click",(e)=> {
                        if (e.target.classList.contains("btn-danger")){
                           item.removeChild(item.children[1])
                           myfixeddiv.parentElement.removeChild(myfixeddiv)
                        }
                        else if (e.target.classList.contains("btn-dark")){
                           myfixeddiv.parentElement.removeChild(myfixeddiv)
                        }
                     })
                     
                  }
                  if (e.target.classList.contains("edit")){

                     let editbuton=document.createElement("button")
                     editbuton.textContent="Click after you edit"
                     editbuton.className="btn btn-danger mt-2"
                     let mynewinput=mypersonalreply2.querySelector("input")
                     mynewinput.classList.remove("d-none")
                     mypersonalreply2.querySelector(".insertedit").appendChild(editbuton)
                     editbuton.addEventListener("click",(e)=> {
                        mypersonalreply2.querySelector(".pt-3 .text-muted").innerHTML=mynewinput.value
                        mynewinput.classList.add("d-none")
                        editbuton.parentElement.removeChild(editbuton)
                     })
                    
                  }
               })

               }
            })
           
            }
            if (e.target.classList.contains("replyimg2") && item.children.length<=1 ){
                console.log("found")
                let mypersonalreply=document.createElement("div")
                mypersonalreply.classList.add("container")
                mypersonalreply.classList.add("mt-3")
                mypersonalreply.classList.add("mb-3")
                mypersonalreply.innerHTML=`  
                
                <div class="row ">
                <div class="col-md-6 offset-md-3 d-flex justify-content-around">
                 
                   <div><img src="./images/avatars/olgu.jpg" alt="" class="avatar">  </div>
                    
                  
                 
                 
                  <button class='btn btn-primary replybuton'>REPLY</button> 
                
                 
                </div>
             </div>
                
                 
                
             `
             //3 e koy
             let myreplyinput=document.createElement("input")
             myreplyinput.value='@'+item.id
             myreplyinput.classList.add("myform")
             mypersonalreply.childNodes[1].childNodes[1].insertBefore( myreplyinput ,mypersonalreply.childNodes[1].childNodes[1].childNodes[3])
           
             //console.log(myreplyinput.value)
             //console.log(mypersonalreply.childNodes[1].childNodes[1])
             //console.log(mypersonalreply.childNodes[1].childNodes[1].childNodes[3])
             e.currentTarget.appendChild(mypersonalreply)
            //  setTimeout(()=> {
            //     item.removeChild(mypersonalreply)
            //  },60000)
             mypersonalreply.addEventListener("click",(e)=> {
               if (e.target.classList.contains("replybuton")){
                  item.removeChild(item.children[1])
                  let mypersonalreply2=document.createElement("div")
                  mypersonalreply2.classList.add("container")
                  mypersonalreply2.classList.add("mt-3")
                  mypersonalreply2.innerHTML=` <div class="row comment">
                  <div class="col-md-6 offset-md-3 myrow ">
                    <div class="row flex-column-reverse flex-md-row">
                     <div class="col-md-1 d-flex justify-content-around align-content-center">
                       <div class="rectangle">
                       <a  ><img src="./images/icon-plus.svg" alt="" class='plusimg' ></a>  
                         <p class="plusp">0</p>
                        <a  ><img src="./images/icon-minus.svg" alt="" class='minusimg'></a> 
                       </div>
                       <div class="d-block d-sm-none "><img src="./images/icon-delete.svg" alt="" class="mr-2 delete"><span class='delete'>Delete</span>
                       <img src="./images/icon-edit.svg" alt="" class="mr-2 edit"><span class='edit'>Edit</span></div>
                    </div>
                    <div class="col-md-11 px-5 insertedit">
                         <div class="d-flex justify-content-between align-items-center">
                            <div><img src="./images/avatars/olgu.jpg" alt="" class="avatar"> <span class="px-3"><b>Olgu Can</b>  </span> <span class="text-muted">now</span></div>
                            <div class="d-none d-sm-block "><img src="./images/icon-delete.svg" alt="" class="mr-2 delete"><span class='delete'>Delete</span>
                            <img src="./images/icon-edit.svg" alt="" class="mr-2 edit"><span class='edit'>Edit</span></div>
                         </div>
                         <div class="pt-3">
                           <p class="text-muted">${myreplyinput.value}</p>
                           <input class='d-none' value='${myreplyinput.value}'>
                         </div>
                    </div>
                    </div>
                  </div>
               </div>`
               item.appendChild(mypersonalreply2)
               mypersonalreply2.addEventListener("click",(e)=> {
                  if (e.target.classList.contains("delete")){

                        let myfixeddiv =document.createElement("div")
                     myfixeddiv.className="myfixeddiv"
                     let uyari =document.createElement("div")
                     uyari.classList.add("uyari")
                     uyari.innerHTML=`<h1>Delete Comment</h1><p>Are you sure you want to delete this comment?This will 
                  remove the comment and can't be undone </p> <button class='btn btn-dark'>NO,CANCEL </button>
                     <button class='btn btn-danger ml-2'>YES,DELETE </button>`
                     myfixeddiv.appendChild(uyari)
                     document.body.appendChild(myfixeddiv)
                     myfixeddiv.addEventListener("click",(e)=> {
                        if (e.target.classList.contains("btn-danger")){
                           item.removeChild(item.children[1])
                           myfixeddiv.parentElement.removeChild(myfixeddiv)
                        }
                        else if (e.target.classList.contains("btn-dark")){
                           myfixeddiv.parentElement.removeChild(myfixeddiv)
                        }
                     })
                  }
                  if (e.target.classList.contains("edit")){

                     let editbuton=document.createElement("button")
                     editbuton.textContent="Click after you edit"
                     editbuton.className="btn btn-danger mt-2"
                     let mynewinput=mypersonalreply2.querySelector("input")
                     mynewinput.classList.remove("d-none")
                     mypersonalreply2.querySelector(".insertedit").appendChild(editbuton)
                     editbuton.addEventListener("click",(e)=> {
                        mypersonalreply2.querySelector(".pt-3 .text-muted").innerHTML=mynewinput.value
                        mynewinput.classList.add("d-none")
                        editbuton.parentElement.removeChild(editbuton)
                     })
                    
                  }
               })

               }
            })
            }
            //fsdfdfburaya koy
        })
       
    })
    let wholediv =document.querySelectorAll(".rectangle")
    wholediv.forEach(item => {
       item.addEventListener("click",(e)=> {
          if (e.target.classList.contains("plusimg")){
              let num=parseInt(item.querySelector(".plusp").innerHTML)
              num++
              item.querySelector(".plusp").innerHTML=num
          }
          else if (e.target.classList.contains("minusimg")){
            let num=parseInt(item.querySelector(".plusp").innerHTML)
            num--
            item.querySelector(".plusp").innerHTML=num
        }
       })
    })
     console.log(userNames)
})




})


// `
// <div class="row ">
// <div class="col-md-6 offset-md-3 ">
//   <div class="row ">
//    <div class="col-md-1 ">
//    <div><img src="./images/avatars/image-juliusomo.png" alt="" class="avatar">  </div>
    
//   </div>
//   <div class="col-md-9 px-2">
//    <input class='form-control' value='@${e.currentTarget.id}'> 
//   </div>
//   <div class="col-md-2 px-1">
//   <button class='btn btn-primary replybuton'>REPLY</button> 
//  </div>
//   </div>
// </div>
// </div>`
