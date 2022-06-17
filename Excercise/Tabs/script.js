const tabs = document.querySelectorAll('.tabs .tab-link');
const contentList = document.querySelectorAll('.tab-content');

for (let i = 0; i < tabs.length; i++) {
  tabs[i].addEventListener('click', function (e) {
    for (let j = 0; j < tabs.length; j++) {
      if (tabs[j].classList.contains('current')) {
        tabs[j].classList.remove('current');
      }
    }
    tabs[i].classList.add('current');
    const tabContent = document.getElementById(`${tabs[i].dataset.tab}`);
    for (let j = 0; j < contentList.length; j++) {
      if (contentList[j].classList.contains('current')) {
        contentList[j].classList.remove('current');
      }
    }
    tabContent.classList.add('current');
  });
}
