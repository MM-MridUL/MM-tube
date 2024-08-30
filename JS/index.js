const loadButtonData= async()=>{
    const res= await fetch('https://openapi.programming-hero.com/api/videos/categories')
    const data=await res.json()
    const buttons=data.data;
    displayButton(buttons)

}
loadButtonData()

const displayButton=(buttons)=>{
    buttonContainer=document.getElementById('button-container');

    for(const button of buttons ){
        // console.log(button);
       const buttonName=button.category;

       const newButton=document.createElement('button');
       newButton.classList=`btn mr-4`;
       const category=button.category_id
       newButton.setAttribute('onclick', `allButton('${category}')`);
       newButton.innerText=`${buttonName}`;    
         buttonContainer.appendChild(newButton);
        //  dynamic call
        // const buttonId=button.category_id;
        // loadData(buttonId);

    }
   

}


const loadData=async(id=1000)=>{
    // console.log(id);
    const res=await fetch(` https://openapi.programming-hero.com/api/videos/category/${id}`)
    const data=await res.json()
    const cards=data.data;
    // console.log(cards);
    const kisuNai= document.getElementById('kisunai');
    kisuNai.textContent='';
    if(cards.length===0){
       
        kisuNai.textContent='';
        p=document.createElement('p');
        p.innerHTML=`

         <p>Sorry</p>
      <img class="mx-auto mt-4"
                src="JS/Icon.png"
                alt="Shoes" />

        `
        kisuNai.appendChild(p)

    }
    // console.log(cards)
    displayData(cards)
    sortByView(cards);
   


}
loadData()


const displayData=(cards)=>{
   
    const cardContainer= document.getElementById('card-container');
    cardContainer.textContent='';

   
   
    // console.log(cards);
    for(const card of cards){
        // console.log(card);

        newDiv=document.createElement('div');
        newDiv.classList=`card bg-base-100 shadow-xl p-4`
        newDiv.innerHTML=`<figure>
              <img
                src="${card.thumbnail}"
                alt="Shoes" />
            </figure>
            <div class="card-body">
            <div class="flex justify-between items-center gap-4">
                 <div>
                        <img
                src="${card.authors[0].profile_picture}"
                alt="profile-pic" class="w-12 h-12 rounded-full" />
                 </div>
                 <div>
                     <p class="text-start text-xl font-bold">${card.title}</p>
                      <p class="">${card.authors[0].profile_name}</p>
                    <p class="">${card.others.views} views</p>
        
                 </div>
               
            </div>
           
            </div>`

            cardContainer.appendChild(newDiv);

           
          



    }

}
const allButton=(id)=>{
    
   
    loadData(id);
}


// blog button
function information(){
    window.location.href='information.html';
}
function back(){
    window.location.href='index.html'
}

// views
function sortByView(cards){
    // const views=cards[0].others;
    // console.log(views)
    // const view1=cards.map(view=>view.others)
    // console.log(view1);
   

 cards.sort((a, b) => convertViews(b.others.views) - convertViews(a.others.views));
   displayData(cards)

}

 function convertViews(views) {
        if (views.endsWith('k')) {
            // Remove 'k' and multiply by 1000
            return parseFloat(views.replace('k', '')) * 1000;
        } else {
            // If there's no 'k', just return the number as it is
            return parseFloat(views);
        }
    }
    
    

