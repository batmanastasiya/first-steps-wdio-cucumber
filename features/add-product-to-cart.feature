Feature: The Swag Labs Website

  Background:
    Given I am logged in as a standard user

  Scenario: As a user, I can add products to the cart

    Given I am on the inventory page
    When I add product to the cart
    Then I should see Shopping Cart icon contains the number of products added
      And I should see the product in the cart