Feature: The Swag Labs Website

  Scenario Outline: As a user, I can log in

    Given I am on the login page
    When I login with <username> and <password>
    Then I should see inventory page
      And I should see the 'Products' label
      And I should see shopping cart icon
      And I should see more than 1 product

    Examples:
      | username      | password     |
      | standard_user | secret_sauce |
