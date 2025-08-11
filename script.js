document.addEventListener('DOMContentLoaded', function () {
    const steps = [document.getElementById('step1'), document.getElementById('step2'), document.getElementById('step3')];
    const progress = document.getElementById('progressBar');
    const swatches = document.querySelectorAll('.swatch');
    const preview = document.getElementById('preview');
    const sTheme = document.getElementById('sTheme');
    const sType = document.getElementById('sType');
    const sCat = document.getElementById('sCat');
    const sPlan = document.getElementById('sPlan');
  
    let current = 0;
    function show(i){
      steps.forEach((el, idx) => el.classList.toggle('hidden', idx !== i));
      progress.style.width = ((i+1)/3*100) + '%';
      current = i;
    }
  
    // default theme
    function setTheme(hex, name){
      document.documentElement.style.setProperty('--primary', hex);
      sTheme.textContent = name;
    }
    setTheme('#ff7a00','Orange');
  
    // swatch click
    swatches.forEach(btn => {
      btn.addEventListener('click', function(){
        swatches.forEach(b=>b.classList.remove('selected'));
        this.classList.add('selected');
        const hex = this.dataset.hex;
        const name = this.dataset.name;
        setTheme(hex, name);
      });
    });
  
    // navigation buttons
    document.getElementById('to2').addEventListener('click', ()=> show(1));
    document.getElementById('back1').addEventListener('click', ()=> show(0));
    document.getElementById('back2').addEventListener('click', ()=> show(1));
  
    document.getElementById('to3').addEventListener('click', function(){
      const ptype = document.getElementById('ptype').value;
      const pcat = document.getElementById('pcat').value;
      if(!ptype || !pcat){
        alert('Please choose product type and category.');
        return;
      }
      sType.textContent = ptype;
      sCat.textContent = pcat;
      show(2);
    });
  
    // plan change -> update summary
    document.querySelectorAll('input[name="plan"]').forEach(r => {
      r.addEventListener('change', function(){
        sPlan.textContent = this.value;
      });
    });
  
    // finish
    document.getElementById('finish').addEventListener('click', function(){
      const theme = sTheme.textContent;
      const type = sType.textContent || '—';
      const cat = sCat.textContent || '—';
      const plan = sPlan.textContent || (document.querySelector('input[name="plan"]:checked')||{value:'Basic'}).value;
      alert('Submitted!\nTheme: '+theme+'\nType: '+type+'\nCategory: '+cat+'\nPlan: '+plan);
    });
  
    // keep initial summary values
    sType.textContent = document.getElementById('ptype').value || 'Clothing';
    sCat.textContent = document.getElementById('pcat').value || 'Men';
    sPlan.textContent = document.querySelector('input[name="plan"]:checked').value;
  });
  