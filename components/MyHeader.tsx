
interface Props {
    headerVisible: boolean
}
export default function MyHeader(props: Props) {
    const { headerVisible } = props
    if (!headerVisible) {
        return <div />
    }
    return (
        <div>
            <nav className="h-10 z-50 fixed top-0 left-0 right-0 navbar navbar-expand-lg shadow-md py-2 bg-white  flex items-center w-full justify-between">

            </nav>
            <div className="h-10">

            </div>
        </div>
    )
}