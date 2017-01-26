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
request. This will return a list of all product types.

**Product types API request**::

    GET https://api.virtusize.com/a/api/v3/product-types


Product type details
^^^^^^^^^^^^^^^^^^^^

To get detailed information about a specific product type issue the
following GET request.


**Example details API request**::

    GET https://api.virtusize.com/a/api/v3/product-types/dress

**Example response**::

    {
        "id": 1,
        "name": "dress",
        "requiredMeasurements": [
            "height",
            "bust",
            "waist"
        ],
        "optionalMeasurements": [
            "hip",
            "sleeveOpening",
            "hem",
            "waistHeight"
        ],
        "minMeasurements": {
            "hip": 150,
            "waistHeight": 150,
            "waist": 100,
            "sleeveOpening": 50,
            "bust": 150,
            "height": 500,
            "hem": 200
        },
        "maxMeasurements": {
            "hip": 1500,
            "waistHeight": 750,
            "waist": 1200,
            "sleeveOpening": 400,
            "bust": 1200,
            "height": 2500,
            "hem": 2000
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
