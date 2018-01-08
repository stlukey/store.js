import newMessage from '../messages/actions';

export default function (router, dispatch) {
    dispatch(newMessage(
        "You must log in to do that.",
        'danger'
    ));
    window.redirect = router.location.pathname;
    router.push(`/login`);
}
