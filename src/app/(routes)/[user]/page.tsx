
export default function Profile({ params }: { params: { user: string } }) {

    return <div><h1 className="text-white">User Profile: {params.user}</h1></div>
}