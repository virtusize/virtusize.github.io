.. _label-product-types:

Product Types
=============

About
-----

We support a range of different types of garments and are always working
towards more types. This list is the latest up to date list of the
supported product types.

Each type has a set of measurements, some measurements are mark as
required and represent the minimal subset if measurements that must be
provided.

A product type is identified by its common English name in camelCase.


Product Types API
-----------------

There are different product types supported by Virtusize, and we are
always working on implementing more product types. We provide a JSON API
to get the data about each product type. Each product type has a
specific set of required measurements and optional measurements. A
product type is identified by its common English name in camelCase.

**Examples of product type identifiers:**

-  dress
-  tShirt
-  pants

.. note:: Note the camelCase formatting of "tShirt".

The latest list of available product types can be queried by the
following GET request:


**Product types API request:**

::

    GET http://api.virtusize.com/api/v2/product-types


**Example response:**

.. gist:: https://gist.github.com/butschi/5634933
       

Product type details
^^^^^^^^^^^^^^^^^^^^

To get detailed information about a specific product type issue the
following GET request.


**Example details request:**

::

    GET http://api.virtusize.com/api/v2/product-types/dress

**Example response:**

.. gist:: https://gist.github.com/butschi/5634978
    

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
    Note that the "length" measurement is always represented as "height", as
    "length" is ambiguous in JavaScript.


List of product types
---------------------

.. raw:: html

    <div id="product-types-container"></div>

