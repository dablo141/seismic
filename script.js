// Quiz data
const quizData = [
  { q:"When you hear 'Seismic,' what excites you most?", options:["Protecting info","Creating ideas","Building systems","Exploring freely"], house:["Obsidian","Quartz","Granite","Pumice"] },
  { q:"How do you solve problems?", options:["Carefully","Creatively","Methodically","Boldly"], house:["Obsidian","Quartz","Granite","Pumice"] },
  { q:"Which project excites you?", options:["Secure","Innovative","Challenging","Independent"], house:["Obsidian","Quartz","Granite","Pumice"] },
  { q:"How do you thrive in a team?", options:["Ensure security","Inspire creativity","Structure work","Work independently"], house:["Obsidian","Quartz","Granite","Pumice"] },
  { q:"If Seismic were a rock, which would you be?", options:["Sharp & dark","Clear & bright","Solid & dependable","Light & free"], house:["Obsidian","Quartz","Granite","Pumice"] },
  { q:"Learning style?", options:["Master rules","Experiment","Build carefully","Dive in"], house:["Obsidian","Quartz","Granite","Pumice"] },
  { q:"Favorite tool?", options:["Security toolkit","Innovation lab","Build kit","Self-serve kit"], house:["Obsidian","Quartz","Granite","Pumice"] },
  { q:"Ideal work environment?", options:["Controlled","Bright/creative","Structured","Flexible"], house:["Obsidian","Quartz","Granite","Pumice"] },
  { q:"How tackle challenges?", options:["Protect resources","Innovate","Step by step","Figure it out"], house:["Obsidian","Quartz","Granite","Pumice"] },
  { q:"Ultimate goal?", options:["Protect security","Innovate","Master craft","Operate freely"], house:["Obsidian","Quartz","Granite","Pumice"] }
];

const rockImages = {
  "Obsidian":"https://i.imgur.com/6N0q7Jx.jpg",
  "Quartz":"https://i.imgur.com/ZF9mP5b.jpg",
  "Granite":"https://i.imgur.com/n6KQpo6.jpg",
  "Pumice":"https://i.imgur.com/5KXHQ7U.jpg"
};

const descriptions = {
  "Obsidian":"Protective, strategic, sharp-minded; you value security above all.",
  "Quartz":"Bright, creative, multifaceted; you thrive on new ideas and change.",
  "Granite":"Strong, reliable, steady; you excel at building systems and mastering your craft.",
  "Pumice":"Light, adaptable, autonomous; you thrive on independence and exploration."
};

const form = document.getElementById('quizForm');
const doneBtn = document.getElementById('doneBtn');
const resultCard = document.getElementById('resultCard');
const rockImage = document.getElementById('rockImage');
const houseNameEl = document.getElementById('houseName');
const houseDescEl = document.getElementById('houseDesc');
const downloadBtn = document.getElementById('downloadBtn');

// Render quiz
quizData.forEach((q,index)=>{
  const div = document.createElement('div');
  div.className='question';
  div.innerHTML=`<strong>Q${index+1}: ${q.q}</strong>`;
  q.options.forEach((opt,i)=>{
    const label = document.createElement('label');
    label.innerHTML=`<input type="radio" name="q${index}" value="${q.house[i]}"> ${opt}`;
    div.appendChild(label);
  });
  form.appendChild(div);
});

// Show result
doneBtn.addEventListener('click', ()=>{
  const formData = new FormData(form);
  if([...formData.values()].length<quizData.length){ alert("Answer all questions!"); return; }
  const tally={};
  for(let val of formData.values()){ tally[val]=(tally[val]||0)+1; }
  let max=0,userHouse='';
  for(let h in tally){ if(tally[h]>max){max=tally[h]; userHouse=h; }
  }
  rockImage.src=rockImages[userHouse];
  houseNameEl.textContent=`You belong to ${userHouse}`;
  houseDescEl.textContent=descriptions[userHouse];
  resultCard.style.display='block';
  resultCard.scrollIntoView({behavior:'smooth'});
  confetti({particleCount:150, spread:70, origin:{y:0.6}});
});

// Download result card
downloadBtn.addEventListener('click',()=>{
  html2canvas(resultCard).then(canvas=>{
    const link=document.createElement('a');
    link.download='Seismic_Rock_House.png';
    link.href=canvas.toDataURL();
    link.click();
  });
});
