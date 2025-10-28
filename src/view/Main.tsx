import { useSongs } from "../queries/useSongs";

const Main = () => {
    const songs = useSongs();
    console.log('songs', songs);
    return (
        <article>
            <header></header>
            <footer></footer>
        </article>
    )
}

export default Main;