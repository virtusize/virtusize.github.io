.. _label-product-types:

Product Types
=============

We support a large range of different types of garments and are continuously
working towards supporting more types.

Each type has a set of measurements. Some measurements are marked as required and
represent the minimal subset of measurements that have to be provided.

A product type is identified by its common English name in camelCase.


.. _label-product-types-api:

Product Types API
-----------------

We provide a JSON API to get the data about each product type.

The latest list of available product types can be queried by the following GET
request.

**Product types API request:**

::

    GET https://api.virtusize.com/api/v2/product-types


.. highlight:: javascript

**Example response:**::

    [
      "dress",
      "shirt",
      "sweater",
      "tShirt"
    ]


Product type details
^^^^^^^^^^^^^^^^^^^^

To get detailed information about a specific product type issue the
following GET request.


**Example details request:**

::

    GET https://api.virtusize.com/api/v2/product-types/dress

**Example response:**::

    {
      "name": "dress",
      "requiredMeasurements": [
        "height",
        "bust",
        "waist",
        "hip"
      ],
      "optionalMeasurements": [
        "sleeveOpening",
        "hem",
        "waistHeight"
      ],
      "maxMeasurements": {
        "hip": 800,
        "waistHeight": 550,
        "waist": 700,
        "sleeveOpening": 400,
        "bust": 700,
        "height": 1700,
        "hem": 1200
      },
      "minMeasurements": {
        "hip": 300,
        "waistHeight": 250,
        "waist": 200,
        "sleeveOpening": 100,
        "bust": 250,
        "height": 650,
        "hem": 200
      }
    }


Product type attributes
^^^^^^^^^^^^^^^^^^^^^^^

name
    *String* - Unique product type identifier in camelCase.

requiredMeasurements
    *List* - Measurements that are required for this product type.

optionalMeasurements
    *List* - Measurements that are optional for this product type.

maxMeasurements
    *Object* - JSON object representing maximal measurements for this
    product type in millimeters.

minMeasurements
    *Object* - JSON object representing minimal measurements for this
    product type in millimeters.

.. note::
    The ``length`` measurement is always represented as ``height``, as
    ``length`` is ambiguous in JavaScript.
