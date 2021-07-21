window.addEventListener("load", f_start);
// autorun
function f_start (){
	let filter_inp = document.getElementById("filter_inp");
	filter_inp.addEventListener("input", function(e){
		// регулярка
		let pattern = new RegExp(this.value, "i");
		let tmp_val;
		let tmp_id = 0;

		let tbl = document.getElementById('t1');
		let tbl_tr = tbl.getElementsByTagName('tr');
		let tbl_cells;
		// цикл по строкам
		for(let i=1; i < tbl_tr.length; i++){
			// сначала всем строкам атрибут активности проставим 0, если пот паттерн подойдут вернем 1 и отрисуем их
			tbl_tr[i].setAttribute('active',0);
			tbl_cells = tbl_tr[i].getElementsByTagName('td');
			// цикл по ячейкам
			for(let j=0; j<tbl_cells.length; j++){
				// ищем только нужную ячейку
				tmp_val = tbl_cells[j].getAttribute('name_val');
				if((tmp_val) && (pattern.test(tmp_val)) ){
					tmp_id = tmp_id + 1;
					tbl_tr[i].setAttribute('active',1);
					// костыльненько, просто знаем, что название после ID, и чтобы обратиться к ID обращаемся к предыдщей ячейке
					tbl_cells[j-1].innerHTML = String(tmp_id);

				}
			}
		  // ну а тут скрываем все строки, котоыре не подошли
			tmp_val = tbl_tr[i].getAttribute('active');
			if(tmp_val == '0'){
				tbl_tr[i].style.display="none";
			} else{
				tbl_tr[i].style.display="table-row";
			}
		}


	});
}

// реакция документа на вброс файла
document.ondrop = function(e){
	let mas_row;
	// получаем сведения о файле
	let f = e.dataTransfer.files[0];
	console.log("Вбросили файл = " + f.name);
	
	// получаем содержимое файла
	let reader = new FileReader();
	reader.onloadend = function(ev){
		let content = ev.target.result;
		// парсим по строкам через символ "перенос строки"
		mas_row = content.split("\n");

		// отрисуем в таблицу
		f_print_table(mas_row);
	}
	reader.readAsText(f);
	
	return false;
}

document.ondragover = function(e){
	e.preventDefault();
}

function f_print_table(arr_rows){
	let cells_val;
	let tbl_haeder = ''
	  , tbl_body = '';
	let t1 = document.getElementById('t1');
	// для циклов
	let i,j;
	// получим сначала данные для заголовкай
	cells_val = arr_rows[0].split(';');
	
	// Соберем шапку
	tbl_haeder += '<tr>';
	for(i=0; i<cells_val.length; i++){
		tbl_haeder += '<th>'+String(cells_val[i])+'</th>'
	}
	tbl_haeder += '</tr>';
	
	// теперь соберем основное тело
	for(i=1; i<arr_rows.length; i++ ){
		cells_val = arr_rows[i].split(';');
		tbl_body += '<tr active="1">';
		for(j=0; j<cells_val.length; j++){
			if(j == 1){
				tbl_body += '<td name_val="'+String(cells_val[j])+'">'+String(cells_val[j])+'</td>';
			} else if (j>1) {
				tbl_body += '<td months_val="'+String(cells_val[j])+'">'+String(cells_val[j])+'</td>';
			} else {
				tbl_body += '<td>'+String(cells_val[j])+'</td>'
			}

		}
		tbl_body += '</tr>'
	}
	
	t1.innerHTML = '<thead>'+tbl_haeder+'</thead><tbody>'+tbl_body+'</tbody>';	
}

























