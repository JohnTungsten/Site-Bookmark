document.getElementById('myForm').addEventListener('submit', saveBookmark);
function saveBookmark(e) {
  e.preventDefault();
  // console.log(1);
  var siteName = document.getElementById('siteName').value;
  // console.log(siteName);
  var siteUrl = document.getElementById('siteUrl').value;
  var bookmark = { name: siteName, url: siteUrl };
  if (!siteName || !siteUrl) {
    setTimeout(() => alert('Please Enter The Required Fields'), 4000);
    return false;
  }

  var expression = /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)?/gi;
  var regex = new RegExp(expression);
  if (!siteUrl.match(regex)) {
    alert('Please Enter Valid URL');
    return false;
  }
  // console.log(bookmark);

  // LocalStorage Test
  // localStorage.setItem('test', 'hello');
  // console.log(localStorage.getItem('test'));
  // localStorage.removeItem('test');
  // console.log(localStorage.getItem('test'));

  // Storing It In LocalStorage
  if (localStorage.getItem('bookmarks') === null) {
    var bookmarks = [];
    bookmarks.push(bookmark);
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
  } else {
    var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
    bookmarks.push(bookmark);
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
  }
  document.getElementById('myForm').reset();
  // document.getElementById('siteName').value = '';
  // document.getElementById('siteUrl').value = '';
  fetchBookmarks();
}
function deleteBookmarks(url) {
  var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
  for (var i = 0; i < bookmarks.length; i++) {
    if (bookmarks[i].url === url) {
      bookmarks.splice(i, 1);
    }
  }
  localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
  fetchBookmarks();
}
function fetchBookmarks() {
  var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
  var bookmarksResult = document.getElementById('bookmarksResult');
  bookmarksResult.innerHTML = '';
  for (var i = 0; i < bookmarks.length; i++) {
    var name = bookmarks[i].name;
    var url = bookmarks[i].url;
    bookmarksResult.innerHTML += `<div class="well"
    <h3>${name}
    <a class="btn btn-default" target="_blank"
    href="${url}">Visit</a>
    <a onclick="deleteBookmarks('${url}')" class="btn btn-danger"   
    href="#">Delete</a>
    </h3>
    </div> `;
  }
}
