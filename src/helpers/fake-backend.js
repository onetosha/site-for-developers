export { fakeBackend };

function fakeBackend() {
    let users = [{ id: 1, username: "test", password: "test", firstName: "Test", lastName: "User"}];
    let realFetch = window.fetch;
    window.fetch = function(url, opts) {
        return new Promise((resolve, reject) => {
            setTimeout(handleRoute, 500);

            function handleRoute() {
                switch (true) {
                    case url.endsWith('/users/authenticate') && opts.method == "POST":
                        return authenticate();
                    case url.endsWith('/users') && opts.method == "GET":
                        return getUsers();
                    default:
                        return realFetch(url, opts)
                            .then(response => resolve(response))
                            .catch(error => reject(error));
                }
            }

            function authenticate() {
                const { username, password } = body();
                const user = users.find(x => x.username === username && x.password === password);

                if (!user) return error("Username or password are incorrect");

                return ok({
                    id: user.id,
                    username: user.username,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    token: "fake token"
                });
            }
    
            function getUsers() {
                if (!isAuthenticated()) return unauthorized();
                return ok(users); 
            }
    
            function ok(body){
                resolve({ ok: true, text: () => Promise.resolve(JSON.stringify(body)) });
            }
    
            function unauthorized() {
                resolve({ status: 401, text: () => Promise.resolve(JSON.stringify({ message: "Unauthorized" })) });
            }
    
            function error(message) {
                resolve({ status: 400, text: () => Promise.resolve(JSON.stringify({ message })) });
            }
    
            function isAuthenticated() {
                return opts.headers["Authorization"] == "Fake jwt token";
            }
    
            function body() {
                return opts.body && JSON.parse(opts.body);
            }
        });
    }
}