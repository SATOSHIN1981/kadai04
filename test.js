const storage = localStorage;

const table = document.querySelector("table")
// ↑の”table”はどこに紐づくんだろうな。
const todo = document.getElementById("todo")
const priority = document.querySelector("select") 
// ↑がselectである理由が良くわからない。IDやClassじゃなくていいの？
const deadline = document.querySelector('input[type="date"]')
const submit = document.getElementById('submit')


let list = [];  // TODOリストのデータ どんどん変わるから定数constじゃなくて変数let

document.addEventListener('DOMContentLoaded', () => {
    // 1. ストレージデータ（JSON）の読み込み
    const json = storage.todoList;
    if (json == undefined) {
  return;  // ストレージデータがない場合は何もしない
    }
    // 2. JSONをオブジェクトの配列に変換して配列listに代入
    list = JSON.parse(json);
    // 3. 配列listのデータを元にテーブルに要素を追加
    for (const item of list) {
        const tr = document.createElement('tr');

        for (const prop in item) {
            const td = document.createElement('td');
            if (prop == 'done') {
            const checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            checkbox.checked = item[prop];
            td.appendChild(checkbox);
            } else {
            td.textContent = item[prop];
            }
            tr.appendChild(td);
        }

        table.append(tr);
    }

  });



submit.addEventListener('click',()=>{
    const item = {};
    if (todo.value != '') {
        item.todo = todo.value;
      } else {
        // item.todo = "ダミーTODO";
        window.alert('TODOを入力してください');
        return;
      }
    
      item.priority = priority.value;

    if (deadline.value != '') {
        item.deadline = deadline.value;
      } else {
        const date = new Date(); // 本日の日付情報を取得
        item.deadline = date.toLocaleDateString().replace(/\//g, '-'); // 日付の体裁を変更

        // return;
      }

    item.done = false;
    console.log (item)

    todo.value = "";
    priority.value = "普";
    deadline.value = "";

    const tr = document.createElement("tr");
    for(const prop in item){
        const td = document.createElement("td");

        if (prop == 'done') { // 完了欄の場合
            const checkbox = document.createElement('input');  // 要素生成
            checkbox.type = 'checkbox';    // type属性をcheckboxに
            checkbox.checked = item[prop]; // checked属性を設定
            td.appendChild(checkbox);      // td要素の子要素に
          } else {


        td.textContent = item[prop];
          }
        tr.appendChild(td);
    }

table.append(tr);

list.push(item);
storage.todoList = JSON.stringify(list);

})


  const main = document.querySelector('main');

const remove = document.createElement('button');
remove.textContent = '完了したTODOを削除する';
remove.id = 'remove';
const br = document.createElement('br');
main.appendChild(br);
main.appendChild(remove);

remove.addEventListener('click', () => {
    const trList = Array.from(document.getElementsByTagName('tr'));
    trList.shift();
    for (const tr of trList) {
      tr.remove();
    }


  list = list.filter((item) => item.done == false);
  for (const item of list) {

    const tr = document.createElement('tr');

  for (const prop in item) {
    const td = document.createElement('td');
    if (prop == 'done') {
      const checkbox = document.createElement('input');
      checkbox.type = 'checkbox';
      checkbox.checked = item[prop];
      td.appendChild(checkbox);
      checkbox.addEventListener('change', checkBoxListener);
    } else {
      td.textContent = item[prop];
    }
    tr.appendChild(td);
  }

  table.append(tr);





  }
    storage.todoList = JSON.stringify(list);

  
})

const checkBoxListener = (ev) => {
    const trList = Array.from(document.getElementsByTagName('tr'));
    const currentTr = ev.currentTarget.parentElement.parentElement;
    const idx = trList.indexOf(currentTr) - 1;
    list[idx].done = ev.currentTarget.checked;
    storage.todoList = JSON.stringify(list);
  };
  