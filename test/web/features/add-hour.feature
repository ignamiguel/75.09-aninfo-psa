Feature: User can add hours to an existing task
  As an user
  I want to add hours to an existing task
  So that I can record the progress of it

  Scenario: Get hours worked in a task
    Given no hours worked on a task
    Then there are exactly 0 hours worked in the task by me

  Scenario: Register hours worked for a task
    Given a task
      |name        |description      |type      |status      |begin_date |assigned_worker_id |
      |Name Test   |Description Test |Type test |Status Test |2018-11-01 |1                  |
    When I register hours with the quantity 8 and date of today
    Then there are exactly 8 hours worked in the task by me
  
  Scenario: Hours quantity must be greater than zero
    Given a task
      |name        |description      |type      |status      |begin_date |assigned_worker_id |
      |Name Test   |Description Test |Type test |Status Test |2018-11-01 |1                  |
    When I register hours with the quantity 0 and date of today
    Then I get an error
    And  there are exactly 0 hours worked in the task by me

  Scenario: Hours quantity must be lower or equal to 24
    Given a task
      |name        |description      |type      |status      |begin_date |assigned_worker_id |
      |Name Test   |Description Test |Type test |Status Test |2018-11-01 |1                  |
    When I register hours with the quantity 25 and date of today
    Then I get an error
    And  there are exactly 0 hours worked in the task by me
  
  Scenario: Hours date can't be from the future
    Given a task
      |name        |description      |type      |status      |begin_date |assigned_worker_id |
      |Name Test   |Description Test |Type test |Status Test |2018-11-01 |2                  |
    When I register hours with the quantity 8 and date of tomorrow
    Then I get an error
    And  there are exactly 0 hours worked in the task by me
