import type { GetServerSideProps, GetStaticPaths, GetStaticProps, NextPage } from "next"

//DEPLICATED: REDIRECT TO
const Home: NextPage = () => {
    return <div />
}

export const getServerSideProps: GetServerSideProps = async () => {
    return {
        redirect: {
            permanent: true, // 永続的なリダイレクトかどうか
            destination: "/campaign/s/dog/sns", // リダイレクト先
        },
    }
}

export default Home
