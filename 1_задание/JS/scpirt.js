// Получаем список элементов всех ячеек главной таблицы
function f_get_all_cells(argument){
  // Элемент с главной таблицей
  let elem_tbl = document.getElementById('tbl_main')
    , row_cells =[]
    , result = [];
    // цикл по строкам
    for(let i=1; i<elem_tbl.rows.length; i++){
        // цикл по ячейкам
        for(let j=2; j<elem_tbl.rows[i].cells.length; j++){
            // добавляем элеминт
            row_cells.push(elem_tbl.rows[i].cells[j]);
        }
        // получим массив с максимальными/минимальными значениями в строке
        row_cells = get_cells(row_cells, argument)
        // пройдем по каждому элемнету и занесем его в итоговый массив
        row_cells.reduce(function(result, val){
            result.push(val);
            return result
        }, result)
        // обнуляем
        row_cells = [];
    }
    return result;
}

/**
 * Возвращает массив элементов под нужную операцию
 * @param all_cells - коллекция элементов - все ячейки таблицы
 * @param argument  - [1]-будем искати MAX. [-1]-будем искать MIN
 */
function get_cells(all_cells, argument){
    let tmp_max = 0
      , tmp_val = 0
      , elem_cells = [];

    // пройдем по порядку по всем ячейкам
    for(let i=0; i<all_cells.length; i++){
        /** получаем значение элемента
         * тут же домножаем на агрумент, дальше как это работает.... допустим имеем коллекцию [1,2,3,4]
         * если аргумент = 1, тот тут все пойдет по стандарной логике, максимальное будет число 4
         * если аргумент = -1, инвертируем коллекцию, она превартится в [-1,-2,-3,-4], где -1 будет самым большим
         */
        tmp_val = parseInt(all_cells[i].innerHTML) * argument;

        // чтобы начать сравнивать, присвоим макстимальному значнию значнеие перовго элемента
        if( i == 0){
            tmp_max = tmp_val;
        }

        // если значение больше темпового значения
        if (tmp_val > tmp_max){
            // Запомним максимальное значнеие
            tmp_max = tmp_val;
            // зануляем коллекцию, чтобы убрать старые данные
            elem_cells = []
            elem_cells.push(all_cells[i]);
        } else if (tmp_val === tmp_max){
            // добавим в коллекцию этот элеменит
            elem_cells.push(all_cells[i]);
        }
    }
    return elem_cells;
}

// Закрасим максимальные элементы
function f_paint_max_cells(){
    // получаем списко
    let elem_max_cells = f_get_all_cells(1);
    // цикл по всем элементам
    for(let i=0; i<elem_max_cells.length; i++){
        elem_max_cells[i].style.backgroundColor = 'green';
    }
}

// Закрасим минимальные элементы
 function f_paint_min_cells(){
    // получаем списко
    let elem_min_cells = f_get_all_cells(-1);
    // цикл по всем элементам
    for(let i=0; i<elem_min_cells.length; i++){
        elem_min_cells[i].style.backgroundColor = 'red';
    }
}

// Получим сумму проданного товара
function f_summ(){
    let all_cells = f_get_all_cells(1);
    // Вспомогательные переменные
    let result_summ = 0;

    for(let i=0; i<all_cells.length; i++){
        // Добавим сумму
        result_summ += parseInt(all_cells[i].innerHTML);
    }

    // Суммарно продано
    let result = document.getElementById('result');
    result.innerHTML = 'Суммарно продано: '+result_summ;
}