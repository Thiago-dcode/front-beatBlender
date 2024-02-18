export default function Profile({ params }: { params: { user: string } }) {
    return <div>User Profile: {params.user}</div>
}