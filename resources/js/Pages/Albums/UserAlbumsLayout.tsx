
interface Purchase {
    id: string;
    title: string;
    // ... otros campos del album
}
export default function UserAlbumsLayout({
    purchasedAlbums,
    purchasedSongs,
}: {
    purchasedAlbums: Purchase[],
    purchasedSongs: Purchase[]
}) {



    console.log(purchasedAlbums);
    console.log(purchasedSongs);
    return (
        <h1 className="text-white">USER ALBUMS</h1>
    )
}