(()=>{
  "use strict";
  const $=id=>document.getElementById(id);
  const form=$("pw-builder");
  if(!form)return;
  const output=$("pw-output"),status=$("pw-copy-status");
  function update(){
    const level=$("pw-level").value;
    const skill=$("pw-skill").value.toLowerCase();
    const goal=$("pw-goal").value.trim() || "[state your learning objective]";
    const kind=$("pw-format").value.toLowerCase();
    const support=$("pw-support").checked;
    output.value = `Act as an experienced EFL teacher and instructional designer.\n\nDesign a 10-minute ${skill} activity for ${level}-level secondary-school learners.\n\nLearning objective: ${goal}.\n\nPresent the activity as ${kind}. Make the task communicative and age-appropriate.`+
      (support ? `\n\nInclude optional language scaffolding for learners who need additional support.` : ``)+
      `\n\nInclude brief teacher instructions and a simple way to observe whether learners have achieved the objective. Leave substantive answers for students to produce themselves.`;
  }
  async function copyText(str){
    if(navigator.clipboard && window.isSecureContext){try{await navigator.clipboard.writeText(str);return true;}catch(e){/* fall back */}}
    const temp=document.createElement("textarea");temp.value=str;temp.setAttribute("readonly","");temp.style.position="fixed";temp.style.left="-9999px";document.body.appendChild(temp);temp.select();
    let ok=false;try{ok=document.execCommand("copy");}catch(e){}temp.remove();return ok;
  }
  function say(msg){status.textContent=msg;}
  form.addEventListener("input",()=>{update();say("");});
  form.addEventListener("change",()=>{update();say("");});
  form.addEventListener("reset",()=>{setTimeout(()=>{update();say("Example restored.");},0);});
  $("pw-copy-generated").addEventListener("click",async()=>{say(await copyText(output.value)?"Prompt copied.":"Select and copy the generated prompt above.");});
  document.querySelectorAll("[data-pw-copy]").forEach(button=>{
    button.addEventListener("click",async()=>{
      const t=$(button.getAttribute("data-pw-copy"));if(!t)return;
      const ok=await copyText(t.innerText||t.textContent||"");
      button.textContent=ok?"Copied!":"Select text to copy";
      window.setTimeout(()=>button.textContent="Copy prompt",2000);
    });
  });
  update();
})();
