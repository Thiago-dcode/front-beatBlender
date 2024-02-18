export default function Profile({ params }: { params: { user: string, id: number } }) {
    return <div>User Profile: {params.user}, new keyboard page</div>
}