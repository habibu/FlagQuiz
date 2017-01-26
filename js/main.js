//Habibu Abdullahi
//@n 20/01/2017
//Function to listen to the buttons clicks

$(document).ready(function(){
    	$("#btnPersistir").click(function(e)
		{
			e.preventDefault();
			persistirDados();
	
  		});
		$("#btnBuscar").click(function()
		{
			buscarDados();	
  		});


});

	

//Function to makes a ajax called for accessing the API source

function persistirDados()
	{	
		//Variables definitions

		var $items = $('#items');
		var json_result;
		var result;
		var unix_time = Math.round(+new Date()/1000);
		var contents;

		$.ajax(
		{
			type:'GET',
			url: 'https://api.stackexchange.com/2.2/questions?page=1&pagesize=99&order=desc&sort=activity&tagged=php&site=stackoverflow&client_id=8823',
			dataType: 'json',
			//Function to receives and manipulats the json result

			success:function(items)
			{
			
				localStorage.setItem('salvaDados', JSON.stringify(items));
				$.each(items,function(i, item)
				{
					for (var i = 0; i < item.length; i++) 
						{	
							contents = {last_update:unix_time, content:[]};
							result = {question_id:item[i].question_id,title:item[i].title, owner_name:item[i].owner_name,score:item[i].score,creation_date: item[i].creation_date, link:item[i].link,is_answered:item[i].is_answered};
							contents.content = result;
							json_result = JSON.stringify(contents, null, "\t");
							$items.append(json_result);				
						}
				});
				
			},
				
			//Alert an error message in case of url not received a feedback
	
			error:function(items)
			{
				alert("Error ao connectar a fonte de dados");
			}
		
		});
	}
function buscarDados()
	{
		// Variables to be use for the data manipulation and searching
		var contents;
		var result;
		var unix_time = Math.round(+new Date()/1000);
		var $dados = $('#dados');
		var resultados;
		var page = document.forms["searchForm"]["page"].value;	
		var score = document.forms["searchForm"]["score"].value;	
		var rpp = document.forms["searchForm"]["rpp"].value;	
		var sort = document.forms["searchForm"]["sort"].value;
		var dados = JSON.parse(localStorage.getItem('salvaDados'));
		$.ajax(
		{
			type:'POST',
			url: 'result.html',
			dataType: 'json',
			//Function to receive and manipulate the json result

			success:function(dados)
			{
		
				$.each(dados, function(i, dado)
				{
					for(var i =0; i< dado.length; i++)
					{
						if(page >=1 || rpp <= 99 || score >= dado[i].score || sort === dado[i].is_answered || sort === dado[i].owner_name || sort === dado[i].link || sort === dado[i].title || sort === dado[i].creation_date)
						{							
						contents = {last_update:unix_time, content:[]};
						result = {question_id:dado[i].question_id,title:dado[i].title, owner_name:dado[i].owner_name,score:dado[i].score,creation_date: dado[i].creation_date, link:dado[i].link,is_answered:dado[i].is_answered};		
						contents.content = result;
						resultados = JSON.stringify(contents, null, "\t");
						$dados.append(resultados);
						}
						
					}

				});
			}
		});
	}


