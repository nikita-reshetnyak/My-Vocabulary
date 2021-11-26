const englishInput = document.getElementById('input-eng'),
   russianInput = document.getElementById('input-rus'),
   inputs = document.querySelectorAll('input'),
   saveButton = document.getElementById('btn'),
   table = document.getElementById('table');



let words;
localStorage.length < 1 ? words = [] : words = JSON.parse(localStorage.getItem('words'));


const addWordToTable = index => {
   table.innerHTML += `
      <tr>
         <td>${words[index].translate}</td>
         <td>${words[index].russian}</td>
         <td><button class = "btn">Delete</button></td>
      </tr>
   `
   englishInput.value = '';
   russianInput.value = '';
}
words.forEach((item, index) => {
   addWordToTable(index);
})


const deleteRow = () => {
   if (words.length > 0) {
      const deleteButtons = document.querySelectorAll('.btn');
      deleteButtons.forEach((item, index) => {
         item.addEventListener('click', () => {
            words.splice(index, 1);
            localStorage.setItem('words', JSON.stringify(words));
            table.innerHTML = '';
            words.forEach((item, index) => {
               addWordToTable(index);
            })
            deleteRow();
         })
      })
   }
}
deleteRow();


class CreateWord {
   constructor(translate, russian) {
      this.translate = translate;
      this.russian = russian;
   }
}


saveButton.addEventListener('click', () => {
   if (englishInput.value.length < 1 ||
      russianInput.value.lenght < 1 ||
      !isNaN(englishInput.value) ||
      !isNaN(russianInput.value)

   ) {
      for (let key of inputs) {
         key.classList.add('error');
      }
   } else {
      for (let key of inputs) {
         key.classList.remove('error');
      }

      words.push(new CreateWord(englishInput.value, russianInput.value)); //* создаем экземпляр CreateWord и пушим его в массив word
      localStorage.setItem('words', JSON.stringify(words));
      addWordToTable(words.length - 1);
      deleteRow();

   }
})