function Template() {
}

Template.search = () => `
  <div id="search">
    <form class="searchForm">
      <input type="text" id="searchBox" placeholder="Artist name..." required>
      <input type="button" value="Search" onclick="searchArtist()">
    </form>
    <div id="results"></div>
    <nav id="pagination"></nav>
  </div>
`;

Template.artist = (artist, albums) => `
  <article id="artist">
    <header>
      <h2 id="artistName">${artist.name}</h2>
      <div id="like">${getLike()}</div>
    </header>
    <section>
      <img id="artistPhoto" src="${artist.image[4]["#text"]}" height="200" width="200">
      <p id="artistInfo">${artist.bio.content}</p>
    </section>
    <section id="artistAlbums">
      <h3>Albums</h3>
        ${albums.map(Template.albumFigure).join("")}
    </section>
  </article>
`;

Template.album = album => `
  <article id="album">
   <header>
     <h2 id="albumName">${album.name}</h2>
     <div id="like">${getLike()}</div>
   </header>
   <section>
     <img id="albumPhoto" src="${album.image[4]["#text"]}" height="200" width="200">
     <p id="albumAuthor">${album.artist}</p>
     <p id="albumYear">${album.wiki.published}</p>
     <p id="albumGenre">${album.tags.tag.map(genre => genre.name).join(", ")}</p>
     <p id="albumInfo">${album.wiki.summary}</p
   </section>
   <section>
     <h3>Tracks</h3>
     <p id="tracks">${album.tracks.track.map(track => track.name).join("<br>")}</p>
   </section>
 </article>
`;

Template.artistFigure = (img) => `
  <figure onclick="createArtistScreen(&quot;${img.name}&quot;)">
    <img src="${img.image[3]["#text"]}" height="200" width="200">
    <figcaption><span>${img.name}</span></figcaption>
  </figure>
`;

Template.albumFigure = (img) => `
  <figure onclick="createAlbumScreen(&quot;${img.artist.name}&quot;,&quot;${img.name}&quot;)">
    <img src="${img.image[3]["#text"]}" height="200" width="200">
    <figcaption><span>${img.name}</span></figcaption>
  </figure>
`;
