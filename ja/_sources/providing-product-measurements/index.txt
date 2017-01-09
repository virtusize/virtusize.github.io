.. _label-providing-measurements:

Providing Measurements
======================

To enable Virtusize for a product, the Virtusize Widget needs to know that
product's measurements.

The Virtusize button will only be shown when the integration snippet can find the
measurements for that product in the Virtusize database.

The product and its measurements are identified by the Product ID, which should be
an identifier that identifies the product regardless of size. If possible, the
Product ID should also be specific for different colors.

.. attention::
    The Product ID must match across our database, Product Page Script and Order
    Confirmation Page Script, see :ref:`label-setting-the-product-id`.

There are four main ways of providing measurements to Virtusize:

-  Via the :ref:`label-spec-sheet-service`
-  Via the :ref:`label-web-interface` (manual)
-  Via :ref:`label-bulk-upload` (Excel)
-  Via the :ref:`label-product-feed`


.. _label-spec-sheet-service:

Spec sheet service
------------------

If you are a brand with spec sheets of your products and a Virtusize customer with
a Business or Enterprise level account, you can provide measurements to Virtusize
simply be sending spec sheets to Virtusize. The Virtusize Garment Data team will
extract the relevant data and upload it for you to our database.


.. _label-web-interface:

Web Interface
-------------

The basic way of providing measurements is via our web admin. This can be done to
provide measurements one by one.

1. Login into our `admin <https://www.virtusize.com/admin/>`_ with your credentials

2. Navigate to ``products > add product``

3. Create a new product using the provided form

.. rubric:: **Product menu**

.. image:: https://dasbbwm9ji7ym.cloudfront.net/integration-guide/images/vs-admin-product-menu.png
   :alt: Product menu


.. rubric:: **New product form**

.. image:: https://dasbbwm9ji7ym.cloudfront.net/integration-guide/images/vs-admin-new-product-form.png
   :alt: New product form


.. _label-bulk-upload:

Bulk Upload
-----------

Another way of providing measurements is via the bulk upload, using our Excel
template. This option is most suited if you are a medium sized retailer or single
brand store with seasonal collections.

1. Login into our `admin <https://www.virtusize.com/admin/>`_ with your credentials

2. Navigate to ``product > bulk upload``

3. Download the excel template

4. Populate the excel template with measurements

5. Upload the file via the bulk upload form


.. rubric:: **Bulk upload screen**

.. image:: https://dasbbwm9ji7ym.cloudfront.net/integration-guide/images/vs-admin-bulk-upload-screen.png
   :alt: Bulk upload screen


.. rubric:: **Excel template**

.. image:: https://dasbbwm9ji7ym.cloudfront.net/integration-guide/images/vs-admin-excel-template.png
   :alt: Excel template


.. rubric:: **Bulk upload confirmation**

.. image:: https://dasbbwm9ji7ym.cloudfront.net/integration-guide/images/vs-admin-parsed-bulk-upload.png
   :alt: Bulk upload confirmation


.. _label-product-feed:

Product Feed
------------

This is similar to Pricerunner and Kelkoo feeds, but with a focus on product
measurements. The major difference is that in this case, the feed must only
return information about one product, and not a list of products.

This feed option is suitable if you are a large store with an internal measurement
database that cannot be exposed as an API.

.. attention::
    The feed must return its data using the `UTF-8
    <http://en.wikipedia.org/wiki/UTF-8>`_ encoding.


How it works
^^^^^^^^^^^^

When you integrate with Virtusize, the integration snippet only displays
the widget button if the measurements are defined for a product. Each
product is identified by the product id. If the product does not have
registered measurements, we can issue a request to a URL provided by you
to get the measurements of a product (the feed).

The requests will be sent out by our servers only and the results will be
cached. Additional requests may be issued periodically to get updates.

The feed URL must provide details and measurements about a product given
a product id. If no product is found for given product id the feed must
return a **404** status code.


**Example URL:**

::

    http://www.example.com/backend/product-measurements?id=123456abc


**Example URL 2 (REST):**

::

    http://www.example.com/product/123456abc/measurements


.. note::
    It does not matter how the URL is formed, as long as the product id is part
    of the URL or the query.


Product feed integration example
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

In order to use the product feed, the integration snippet must provide
the ``id`` as well as the ``version`` variables in the product data, lines 7 and 10:

.. code-block:: html
   :linenos:

    <!-- Virtusize Integration -->
    <script>
    !(function(a,d,g,b){var c,h,e,f;a.Virtusize=b;a[b]=a[b]||[];a[b].env=null!=a.vsEnv?a.vsEnv:"production";a[b].url=null!=a.vsUrl?a.vsUrl:a.location.host;a.vsEnv=void 0;a.vsUrl=void 0;a[b].methods="setApiKey setRegion setLanguage setWidgetOverlayColor addWidget ready setMobile on setAvailableSizes setSizeAliases addOrder addFindByFit setUserId".split(" ");a[b].factory=function(c){return function(){var d;d=Array.prototype.slice.call(arguments);d.unshift(c);a[b].push(d);return a[b]}};f=a[b].methods;c=0;for(h=f.length;c<h;c++)e=f[c],a[b][e]=a[b].factory(e);a[b].snippetVersion="4.0.0";c=d.createElement(g);d=d.getElementsByTagName(g)[0];c.async=1;c.src={production:"https://cdn.api.virtusize.com/integration/v4.js",staging:"https://cdn.staging.virtusize.com/integration/v4.js",local:"//"+a[b].url+"/integration/v4.source.js"}[a[b].env];c.id="vs-integration";d.parentNode.insertBefore(c,d)})(window,document,"script","vs");

    vs.setApiKey("API_KEY");
    vs.addWidget({
        productId: "PRODUCT_ID",
        buttonSelector: "BUTTON_SELECTOR",
        productImageUrl: "PRODUCT_IMAGE_URL",
        productVersion: "PRODUCT_VERSION"
    });
    </script>
    <!-- End Virtusize Integration -->


.. note::
    The ``PRODUCT_ID`` and ``PRODUCT_VERSION`` product data parameters must be
    dynamic for each product.

.. note::
    The ``PRODUCT_VERSION`` variable can be an integer, a date, or even a unix
    timestamp, as long as it changes when the product measurements change.


JSON format
^^^^^^^^^^^

The feed must return data as valid
`JSON <http://en.wikipedia.org/wiki/JSON>`_.

`Example feed <https://api.virtusize.com/api/v2/feed/examples/json>`_


**Example request**::

    GET http://www.example.com/product/123456abc/measurements

.. highlight:: javascript

**Example response**::

    {
      "id": "123456abc",
      "type": "dress",
      "name": "Dress - Summer dream",

      "sizes": {

        "small": {
          "height":        88,
          "bust":          41,
          "waist":         37,
          "hip":           42,
          "sleeveOpening": 18,
          "hem":           45,
          "waistHeight":   39
        },

        "medium": {
          "height":        90,
          "bust":          43,
          "waist":         39,
          "hip":           44,
          "sleeveOpening": 20,
          "hem":           47,
          "waistHeight":   41
        },

        "large": {
          "height":        92,
          "bust":          45,
          "waist":         41,
          "hip":           46,
          "sleeveOpening": 22,
          "hem":           49,
          "waistHeight":   42
        }
      }
    }


**Product attributes**

id
    *required* - String/Number - The per retailer unique product identifier.
    Must be the same as the id used to query.

type
    *required* - String - Product type identifier, in camelCase, refers to
    product type section in API reference.

name
    *required* - String - Name of the product, will be visible to customer in
    Widget.

sizes
    *required* - Object - A JSON object containing all available sizes. A dict
    of dicts, the keys in this object are size names as strings. The values are
    measurement objects, containing a collection of measurements and their
    values.


Measurements object
^^^^^^^^^^^^^^^^^^^

Each product size is represented as a measurements object. The measurements
object is also a JSON object. The keys are the measurement names in camelCase.
The values must be numeric integer or floating point values in the unit of your
choice.

.. note::
    The unit of measurements is configured on a store by store basis and the default
    is ``centimeters``. We also support millimeters and inches in decimal
    format. Get in touch with us to configure this for your store.

Please refer to :ref:`label-product-types` for details about measurements for
each product type.


Feed validation
^^^^^^^^^^^^^^^

.. highlight:: html

To validate your feed, you can use our feed tester URL::

    GET https://api.virtusize.com/api/v2/feed/tester/json?apiKey=xxxxxxxxxxxxx&url=http://www.example.com/backend/virtusize/product-info?id=123456abc


Or you can use the Feed tester GUI in our `admin <https://www.virtusize.com/admin/>`_.
