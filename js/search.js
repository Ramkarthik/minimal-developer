document.addEventListener('DOMContentLoaded', function (event) {
    const search = document.getElementById('search');
    const results = document.getElementById('results');
    let posts = [];
    let search_term = '';
    fetch("/feed/feed.JSON")
        .then(res => res.json())
        .then(data => {
            posts = data?.items;
            console.log("data", posts);
        });

    search.addEventListener('input', (event) => {
        console.log("Search");
        search_term = event.target.value.toLowerCase();
        showList();
      });
    
      const showList = () => {
        results.innerHTML = '';
        if (search_term.length <= 0) return;
        let result = posts?.filter((name) => name.title.toLowerCase().indexOf(search_term.toLowerCase()) >= 0);
        if (result.length == 0) {
          const li = document.createElement('li');
          li.innerHTML = `No results found`;
          results.appendChild(li);
        }
        result.forEach((e) => {
          const li = document.createElement('li');
          li.innerHTML = `<time datetime="${e.date_published?.split("T")[0]}">${e.date_published?.split("T")[0]}</time><span>&nbsp; - &nbsp;</span><a href="${e.url}">${e.title}</a>`;
          results.appendChild(li);
        });
      };

  });

  

  