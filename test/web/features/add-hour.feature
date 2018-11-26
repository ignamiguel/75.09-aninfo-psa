Feature: Carga de Horas
  Cómo Usuario del Backlog
  Quiero cargar las horas de mi trabajo a una tarea
  Para poder controlar la asignación de mis tareas y el avance de ellas.

  Scenario: Ver horas trabajadas en una tarea
    Given no hay horas trabajadas en una tarea
    Then hay exactamente 0 horas trabajadas en la tarea por "mi"
    And hay exactamente 0 horas trabajadas en la tarea

  Scenario: Puedo cargar horas a una tarea a la que estoy asignado
    Given una tarea
      |name        |description      |type      |status      |begin_date |assigned_worker_id |project_id|
      |Name Test   |Description Test |Type test |Status Test |2018-11-01 |1                  |1         |
    When "Yo" cargo 8 horas el día de "hoy"
    Then hay exactamente 8 horas trabajadas en la tarea por "mi"
    And hay exactamente 8 horas trabajadas en la tarea
  
   Scenario: No puedo cargar horas a una tarea a la que no estoy asignado
    Given una tarea
      |name        |description      |type      |status      |begin_date |assigned_worker_id |project_id|
      |Name Test   |Description Test |Type test |Status Test |2018-11-01 |1                  |1         |
    When "Yo" cargo 8 horas el día de "hoy"
    When "Cómo otra persona" cargo 8 horas el día de "hoy"
    Then recibo un error "Sólo se puede cargar horas a la tarea asignada."
    And hay exactamente 8 horas trabajadas en la tarea por "mi"
    And hay exactamente 0 horas trabajadas en la tarea por "otra persona"
    And hay exactamente 8 horas trabajadas en la tarea
  
  Scenario: La cantidad de horas tiene que ser mayor a cero
    Given una tarea
      |name        |description      |type      |status      |begin_date |assigned_worker_id |project_id|
      |Name Test   |Description Test |Type test |Status Test |2018-11-01 |1                  |1         |
    When "Yo" cargo 0 horas el día de "hoy"
    Then recibo un error "Las horas cargadas debe ser mayor a 0 y menor o igual a 24."
    And hay exactamente 0 horas trabajadas en la tarea por "mi"
    And hay exactamente 0 horas trabajadas en la tarea

  Scenario: La cantidad de horas tiene que ser menor o igual a 24
    Given una tarea
      |name        |description      |type      |status      |begin_date |assigned_worker_id |project_id|
      |Name Test   |Description Test |Type test |Status Test |2018-11-01 |1                  |1         |
    When "Yo" cargo 25 horas el día de "hoy"
    Then recibo un error "Las horas cargadas debe ser mayor a 0 y menor o igual a 24."
    And hay exactamente 0 horas trabajadas en la tarea por "mi"
    And hay exactamente 0 horas trabajadas en la tarea
  
  Scenario: La cantidad de horas por tarea por día no puede superar las 24 horas
    Given una tarea
      |name        |description      |type      |status      |begin_date |assigned_worker_id |project_id|
      |Name Test   |Description Test |Type test |Status Test |2018-11-01 |1                  |1         |
    When "Yo" cargo 12 horas el día de "hoy"
    When "Yo" cargo 12 horas el día de "hoy"
    When "Yo" cargo 1 horas el día de "hoy"
    Then recibo un error "Sólo se puede cargar hasta 24 horas para una tarea por día."
    And hay exactamente 24 horas trabajadas en la tarea por "mi"
    And hay exactamente 24 horas trabajadas en la tarea
  
  Scenario: La fecha no puede ser del futuro
    Given una tarea
      |name        |description      |type      |status      |begin_date |assigned_worker_id |project_id|
      |Name Test   |Description Test |Type test |Status Test |2018-11-01 |1                  |1         |
    When "Yo" cargo 8 horas el día de "mañana"
    Then recibo un error "No se pueden cargar horas con una fecha futura."
    And hay exactamente 0 horas trabajadas en la tarea por "mi"
    And hay exactamente 0 horas trabajadas en la tarea
