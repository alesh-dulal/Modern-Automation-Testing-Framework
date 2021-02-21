describe('It should successfully set a user and list the user added', () => {
    it('create a user', () => {
        cy.request('POST' , '/api/users', {
            "name": "Srijana",
            "job": "Shrestha"
        }).then((response) => {
            expect(response.status).to.eq(201)
        })
    });

    it('list the created user', () => {
        cy.request('GET', '/api/users/2')
    });
});

