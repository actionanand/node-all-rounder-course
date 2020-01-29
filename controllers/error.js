exports.get404 = (req, res, next) => {
    // res.status(404).sendFile(path.join(__dirname, 'templates/static/404.html'));
    let url = `localhost:3001${req.url}`;
    // res.status(404).render('404', { title: 'Page Not Found', url, layout: false })
    res.status(404).render('404', { title: 'Page Not Found', url, path: '' })
}