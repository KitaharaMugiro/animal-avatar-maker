export default () => {
    return <footer className="p-4 mt-10 bg-white  md:px-6 md:py-8 bg-gray-400">
        <div className="sm:flex sm:items-center sm:justify-between">
            <a href="https://flowbite.com/" className="flex items-center mb-4 sm:mb-0">
                <span className="self-center text-xs whitespace-nowrap">Presented by</span>

                <img src="/icon.png" className="h-4 ml-3 mr-1" alt="Flowbite Logo" />
                <span className="self-center text-md font-semibold whitespace-nowrap">アニマルアバターメーカー</span>
            </a>
            <ul className="flex flex-wrap items-center mb-6 text-sm text-gray-500 sm:mb-0">
                <li>
                    <a
                        href="https://www.instagram.com/animal_avatar_maker/"
                        target="_blank"
                        title="Instagram"
                        rel="noreferrer"
                        className="mr-4 hover:underline md:mr-6 ">Instagram</a>
                </li>
                <li>
                    <a
                        href="https://button-hearing-b81.notion.site/1c714aee9383478382affeb50745b4d7"
                        target="_blank"
                        title="Privacy Policy"
                        rel="noreferrer"
                        className="mr-4 hover:underline md:mr-6">Privacy Policy</a>
                </li>
                <li>
                    <a
                        href="https://www.instagram.com/animal_avatar_maker/"
                        target="_blank"
                        title="Contact"
                        rel="noreferrer"
                        className="hover:underline">Contact</a>
                </li>
            </ul>
        </div>
        <hr className="my-6 border-gray-200 sm:mx-auto border-gray-700 lg:my-8" />
        <span className="block text-sm text-gray-500 sm:text-center ">© アニマルアバターメーカー All Rights Reserved.
        </span>
    </footer>

}