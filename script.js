var url = 'http://www.filltext.com/?rows=32&id=%7Bnumber%7C1000%7D&firstName=%7BfirstName%7D&lastName=%7BlastName%7D&email=%7Bemail%7D&phone=%7Bphone%7C(xxx)xxx-xx-xx%7D&address=%7BaddressObject%7D&description=%7Blorem%7C32%7D';

const dataList=[];
var http = new XMLHttpRequest();
http.open("GET","http://www.filltext.com/?rows=32&id=%7Bnumber%7C1000%7D&firstName=%7BfirstName%7D&lastName=%7BlastName%7D&email=%7Bemail%7D&phone=%7Bphone%7C(xxx)xxx-xx-xx%7D&address=%7BaddressObject%7D&description=%7Blorem%7C32%7D",true);
    http.onreadystatechange= function(){
        if(this.readyState === 4){
            var responeArr=JSON.parse(this.responseText);
            console.log(responeArr);            
            for(var i=0;i<responeArr.length-5;i++){
              tableList(responeArr[i]);             
          }
            
            
        }
    }
    http.send();

    const tableList=(data)=>{
        var tableData=document.getElementById("table-data");
        var tableBody=tableData.getElementsByTagName("tbody");
        var tr=document.createElement("tr");
        tr.className="data-row";
        tr.setAttribute("id",`${data.id}`);
        tr.setAttribute("onclick",`display1(${data.id})`)
        tr.innerHTML=` 
        <td class="column1">${data.id}</td>
        <td class="column2">${data.firstName}</td>
        <td class="column3">${data.lastName}</td>
        <td class="column4">${data.email}</td>
        <td class="column5" >${data.phone}</td>
        <td class="column6" style="display:none;">${data.description}</td>
        <td class="column7" style="display:none;">${data.address.city}</td>
        <td class="column8" style="display:none;">${data.address.state}</td>
        <td class="column9" style="display:none;">${data.address.streetAddress}</td>
        <td class="column10" style="display:none;">${data.address.zip}</td>`;
        $(tableBody).append(tr);
        
    }
    $(document).ready(function(){
        $("#search-box").on("keyup", function() {
          var value = $(this).val().toLowerCase();
          $("#table-data tr").filter(function() {
            $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
          });
        });
      });

  function display1(data){
   var trMain=document.getElementById(data);
   var name=$(`#${data} td:eq(1)`).html();
   var desc=$(`#${data} td:eq(5)`).html();
   var city=$(`#${data} td:eq(6)`).html();
   var state=$(`#${data} td:eq(7)`).html();
   var streetAddress=$(`#${data} td:eq(8)`).html();
   var zip=$(`#${data} td:eq(9)`).html();
   var infoContent=document.getElementById("info-content");
   infoContent.style.display="block";
    infoContent.innerHTML=`
    <div><b>User selected:</b>${name}</div>
    <div>
        <b>Description: </b>
        <textarea cols="50" rows="5" readonly>${desc}
        </textarea>
    </div>
    <div><b>Address:</b> ${streetAddress}t</div>
    <div><b>City:</b> ${city}</div>
    <div><b>State:</b>${state} </div>
    <div><b>Zip:</b> ${zip}</div>`;
  }

 