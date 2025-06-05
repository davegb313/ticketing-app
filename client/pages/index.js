import axios from 'axios';

const LandingPage = ({ currentUser }) => {

    return <h1>landing1 page</h1>
};

LandingPage.getInitialProps = async ({ req }) => {

    if (typeof window === 'undefined') {
        const { data } = await axios.get(
            'http://ingress-nginx-controller.ingress-nginx.svc.cluster.local/api/users/currentuser', {
            headers: req.headers
        });
        console.log(data);
        return data;
    } else {
        const { data } = await axios.get('/api/users/currentuser');
        return data;
    }
}

export default LandingPage;