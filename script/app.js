dayjs.extend(window.dayjs_plugin_customParseFormat); // Allows us to confirm the date with our rules;


const ctx = document.getElementById('grafico').getContext('2d'); // 2d context to draw;

/*Chart.js sintax*/ 
export function pageRender(){

if(window.miGrafico){
  window.miGrafico.destroy();
}


window.miGrafico = new Chart(ctx, { 
  type: 'line',
  data: {
    labels: JSON.parse(localStorage.getItem('fechas')) || [],
    datasets: [{
      label: 'Cap',
      data: JSON.parse(localStorage.getItem('operativas')) || [],
      //borderColor: JSON.parse(localStorage.getItem('border')),
      //backgroundColor: JSON.parse(localStorage.getItem('background')),
      tension: 0.3,
      pointBackgroundColor:'black',
      pointBorderColor: 'black',
    
      segment:{
        borderColor: ctx =>{
          const y1 = ctx.p0.parsed.y;
          const y2 = ctx.p1.parsed.y;

          if(y1 < 0 && y2 < 0){
            return 'rgba(255, 0, 0, 0.30)';
          }

          if(y1 >= 0 && y2 >= 0){
            return 'rgba(0, 255, 0, 0.30)'
          }

          if(y2 < 0 && y1 >= 0){
            return 'rgba(255, 0, 0, 0.30)';
          }

          if(y2 >= 0 && y1 < 0){
            return  'rgba(0, 255, 0, 0.30)';
          }

        }
      },

      fill: false
    }]
  },
  options: {
    responsive: true,
    
    plugins: {
      legend: {
        display: false
      }
    },
    scales: {
        x: {
        display: false, // --> Para que no se muestre el eje X;
        
        ticks: {
          font: {
            family: "'Red Hat Display', monospace",
            size: 14,
            weight: 'bold',
            style: 'normal'
          },
          color: '#000000'
        }
      },
      y: {
        ticks:{
          font:{
            family:"'Red Hat Display', monospace",
            size: 14,
            weight: 'bold',
            style:'normal'
          },
          color:'#3e3e3e'
        },
        beginAtZero: true,
      }
    } 
  }
});



/*End Chart.js sintax*/ 

const regexCapital = /^(?![&*_$%()/!¿¡?'{}]).*\d+$/; // The amount must be entered with that structure;

const regexFecha = /^(?![&*_\-$%()/!¿¡?'{}]).*\d{2}\/(?![&*_\-$%()/!¿¡?'{}]).*\d{2}\/(?![&*_\-$%()/!¿¡?'{}]).*\d{4}$/ // Equal to the date;

const inputCapital = document.querySelector('.capital-input');

const inputFecha = document.querySelector('.fecha-input');

const botonDeIngreso = document.querySelector('.ingresar-button')

const montoPosNeg = JSON.parse(localStorage.getItem('montoPosNeg')) || [];

let acumuladorDiv = JSON.parse(localStorage.getItem('acumulador'))|| 0;

let html = JSON.parse(localStorage.getItem('html')) || '';

let container = document.querySelector('.historial-rows') 

container.innerHTML = JSON.parse(localStorage.getItem('historial')) || '';



/* All the validations will be made when we click the "ingresar" button */


botonDeIngreso.addEventListener('click', () =>{



if(miGrafico.data.datasets[0].data.length === 0 && inputCapital.value <= 0){
      
      document.querySelector('.tooltip-capital').classList.add('tooltip-capital-on');

      setTimeout(() =>{
          document.querySelector('.tooltip-capital').classList.remove('tooltip-capital-on');
      }, 2000)

      return;

}

let acumulado = miGrafico.data.datasets[0].data.at(-1) || 0;
let nuevoValor = acumulado + Number(inputCapital.value);

if(!inputCapital.value.match(regexCapital)){
  

      document.querySelector('.tooltip-capital').innerHTML = 'Caracter inválido';
      document.querySelector('.tooltip-capital').classList.add('tooltip-capital-on');


      setTimeout(() =>{

          document.querySelector('.tooltip-capital').classList.remove('tooltip-capital-on');

      }, 2000)

      setTimeout(() =>{
         document.querySelector('.tooltip-capital').innerHTML = 'Monto mayor que cero';
      }, 3000)



}

  
  if(inputFecha.value.match(regexFecha)){

    
   const fecha = dayjs(inputFecha.value, 'DD/MM/YYYY', true); // Strict check;
   const [dia, mes, ano] = inputFecha.value.split('/')

    /*Validation of the date with correct structure or no*/
    const labels = miGrafico.data.labels;

    if(fecha.isValid() && fecha.date() === Number(dia) && 
  
      fecha.month() + 1=== Number(mes) &&
      fecha.year() === Number(ano) &&
      inputCapital.value.match(regexCapital)){
    
          miGrafico.data.datasets[0].data.push(nuevoValor)
          labels.push(inputFecha.value)
          montoPosNeg.push(Number(inputCapital.value))

          acumuladorDiv += 1;

          container.innerHTML ='';
 
          html += `
        <div class="historial historial-container-into-${acumuladorDiv}">
          <div class="historial">${inputFecha.value}</div>
          <div class="dinero-generado">$${montoPosNeg.at(-1)}</div>
        </div>
  `;

       container.innerHTML += html;

      
      if(labels.length >= 2){

        const ultimaFecha = dayjs(labels.at(-1), 'DD/MM/YYYY');

        for(let i = 0; i < labels.length -1; i++){

        const fechaAnterior = dayjs(labels[i], 'DD/MM/YYYY');

        if(fechaAnterior.isAfter(ultimaFecha)){

          labels.pop();
          miGrafico.data.datasets[0].data.pop()
            const div = document.querySelector(`.historial-container-into-${acumuladorDiv}`);
   
            if (div) {
              div.remove();
              acumuladorDiv = acumuladorDiv - 1;
              montoPosNeg.pop();

            }

            html = container.innerHTML;
            document.querySelector('.tooltip-fecha').classList.add('tooltip-fecha-on')

          setTimeout(() =>{
          document.querySelector('.tooltip-fecha').classList.remove('tooltip-fecha-on')
          },2000)
            break;
          } else if(fechaAnterior.isBefore(ultimaFecha)){

            const numeroAleatorio = numero();

                const mensajeDinamico = document.querySelector('.mensaje-dinamico');

                if(miGrafico.data.datasets[0].data.at(-1) === miGrafico.data.datasets[0].data.at(-2)){
                  if(numeroAleatorio < 0.3){
                    mensajeDinamico.innerHTML = 'Así que día tranquilo ¿verdad?'
                  } else if (numeroAleatorio >= 0.3 && numeroAleatorio<= 0.6){
                    mensajeDinamico.innerHTML = 'Brake even! Ni para ti, ni para el mercado :)';
                  } else{
                    mensajeDinamico.innerHTML = 'Es mejor no ganar, que perder. Recuerda eso.'
                  }
                  
                } else if(miGrafico.data.datasets[0].data.at(-1) > miGrafico.data.datasets[0].data.at(-2) ){

                  if(numeroAleatorio < 0.3){
                    mensajeDinamico.innerHTML = '¡Disfruta tu profit!'
                  } else if (numeroAleatorio >= 0.3 && numeroAleatorio<= 0.6){
                    mensajeDinamico.innerHTML = 'Día de ganancias! Mente fria.';
                  } else{
                    mensajeDinamico.innerHTML = 'Veo que el plan de trading funcionó de nuevo :D'
                  }

                } else if(miGrafico.data.datasets[0].data.at(-1) < miGrafico.data.datasets[0].data.at(-2)){

                  if(numeroAleatorio < 0.3){
                    mensajeDinamico.innerHTML = 'Jmm... Ya veo. Es parte del proceso.';
                  } else if (numeroAleatorio >= 0.3 && numeroAleatorio<= 0.6){
                    mensajeDinamico.innerHTML = '¿Seguiste tu plan de trading?';
                  } else{
                    mensajeDinamico.innerHTML = 'La probabilidad nos acompañará en otra ocasión. Tranquilo.'
                  }

                }
          }
        }
      }

    } else{
      /* If it's no valid, we show a tooltip for 2s */
      document.querySelector('.tooltip-fecha').classList.add('tooltip-fecha-on')

      setTimeout(() =>{
      document.querySelector('.tooltip-fecha').classList.remove('tooltip-fecha-on')
      },2000)
      
    }

    
    function numero(){
      const numeroRandom = Math.random();
      return numeroRandom;

    }



  }



saveToStorage();
miGrafico.update();
//location.reload();



})


const botonDeEliminarHistorial = document.querySelector('.button-eliminar');

botonDeEliminarHistorial.addEventListener('click', () =>{

  localStorage.clear();

  miGrafico.data.datasets[0].data = []
  miGrafico.data.labels = []
          
  console.log(miGrafico.data.datasets[0].data);

  container.innerHTML = '';
  html = container.innerHTML;

  location.reload();

})

  const botonDeEliminarUltimo = document.querySelector('.button-eliminar-anterior');

botonDeEliminarUltimo.addEventListener('click', () =>{
  const labels = miGrafico.data.labels;
  labels.pop();
  miGrafico.data.datasets[0].data.pop()
  

    const div = document.querySelector(`.historial-container-into-${acumuladorDiv}`);
    if (div) {
      div.remove();
      acumuladorDiv = acumuladorDiv - 1;
      montoPosNeg.pop();

    }

    html = container.innerHTML;

  console.log(container.innerHTML)
  
  console.log(html)

  console.log(acumuladorDiv)




  saveToStorage();
  location.reload();
  
})



 function saveToStorage(){

  localStorage.setItem('operativas', JSON.stringify(miGrafico.data.datasets[0].data))
  localStorage.setItem('fechas', JSON.stringify(miGrafico.data.labels));

  localStorage.setItem('montoPosNeg', JSON.stringify(montoPosNeg)) 
  localStorage.setItem('html', JSON.stringify(html))
  localStorage.setItem('historial', JSON.stringify(container.innerHTML))
  localStorage.setItem('acumulador', JSON.stringify(acumuladorDiv))

}




}

pageRender()






