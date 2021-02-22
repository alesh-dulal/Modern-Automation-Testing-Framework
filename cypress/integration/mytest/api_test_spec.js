describe("It should successfully set a user and list the user added", () => {
  it("create a user", () => {
    cy.request("POST", "/api/users", {
      name: "Rosanna",
      job: "Bass",
    }).then((response) => {
      expect(response.status).to.eq(201);
    });
  });

  it("list the existing user", () => {
    cy.request("GET", "/api/users/2").then((resp) => {
      expect(resp.status).to.eq(200);
      expect(resp.body.data).to.have.property("id").to.be.a("number");
      expect(resp.body.data).to.have.property("first_name").equals("Janet");
      expect(resp).to.have.property("duration");
    });
  });

  /**This check will be failed
   * With the response id 2 the property first_name should be Janet.
   */

  it("checks the property of the user", () => {
    cy.request("GET", "/api/users/2").then((resp) => {
      expect(resp.body.data).to.have.property("first_name").equals("Rosanna");
    });
  });

  it("Values from GET used on POST", () => {
    cy.request("Get", "/api/users?page=2")
      .its("body.data.0")
      .as("user")
      .then(function () {
          cy.request('POST','/api/users',{
              name: this.user.first_name,
              job:this.user.last_name
          }).its('body').as('post')
      }).then(function(){
          expect(this.post,'post has the right user name').property('name').to.equal(this.user.first_name)
      })
  });
});