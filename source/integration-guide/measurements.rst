.. _label-providing-measurements:

Providing Measurements
======================

In order for the Widget to correctly visualize the different product
sizes, the Widget needs to know the product's measurements.

There are three main ways of providing these measurements:

-  Via the :ref:`label-web-interface`
-  Via :ref:`label-bulk-upload`
-  Via a product :ref:`label-feed`

For the standard integration, the measurements are provided to Virtusize
via the Virtusize admin interface, and the integration snippet only
needs the unique product ID to identify what measurements to use.

.. note:: 
    For best results, the product id should be an identifier that
    identifies the product regardless of size and color.

No button will be visible on the product page until the integration
snippet can find the measurements for the product.

.. _label-web-interface:

Web Interface
-------------

The basic way of providing measurements is via our web admin. This
option is primarily suited for smaller retailers.

1. Login into our `admin <http://www.virtusize.com/admin/>`_ with your credentials.

2. Navigate to "products > add product"

3. Create a new product using the provided form.

.. rubric:: **Product menu**

.. image:: http://dasbbwm9ji7ym.cloudfront.net/integration-guide/images/02-vs-admin-product-menu.png
   :alt: Product menu


.. rubric:: **New product form**

.. image:: http://dasbbwm9ji7ym.cloudfront.net/integration-guide/images/03-vs-admin-new-product-form.png
   :alt: New product form


.. _label-bulk-upload:

Bulk Upload
-----------

The second way to provide measurements is via the bulk upload, using the
excel template. This option is most suited for medium sized retailers
and single brand stores with seasonal collections.

1. Login into our `admin <http://www.virtusize.com/admin/>`_ with your credentials.

2. Navigate to "product > bulk upload"

3. Download the excel template

4. Populate the excel template with measurements

5. Upload the file via the bulk upload form


.. rubric:: **Bulk upload screen**

.. image:: http://dasbbwm9ji7ym.cloudfront.net/integration-guide/images/04-vs-admin-bulk-upload-screen.png
   :alt: Bulk upload screen


.. rubric:: **Excel template**

.. image:: http://dasbbwm9ji7ym.cloudfront.net/integration-guide/images/05-vs-admin-excel-template.png
   :alt: Excel template


.. rubric:: **Bulk upload confirmation**

.. image:: http://dasbbwm9ji7ym.cloudfront.net/integration-guide/images/06-vs-admin-parsed-bulk-upload.png
   :alt: Bulk upload confirmation


.. _label-feed:

Feed
----

In case the product measurements and data cannot be provided via the
Virtusize admin, the data can instead be provided by a product feed.
This is very similar to Pricerunner and Kelkoo feeds, but with focus on
product measurements. The major difference is that in this case the feed
must only return information about one product, not a list of products.

The feed is implemented by each store according to specification details
in this document. The feed option is suitable for bigger stores that
have internal measurement database and can expose this as an API.

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

The requests will be sent out by our servers only, results will be
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
the ``id`` as well as the ``version`` variables in the product data.

.. highlight:: html

::
    
    <!-- Virtusize Integration -->
    <script>
    !function(a,b,c,d,e,f,g){var h,i,j,k;for(a.Virtusize=e,a[e]=a[e]||[],a[e].methods=["setApiKey","setRegion","setLanguage","setWidgetOverlayColor","addWidget","ready","on","setAvailableSizes","setSizeAliases","addOrder","setUserId"],a[e].factory=function(b){return function(){var c;return c=Array.prototype.slice.call(arguments),c.unshift(b),a[e].push(c),a[e]}},k=a[e].methods,i=0,j=k.length;j>i;i++)h=k[i],a[e][h]=a[e].factory(h);a[e].snippetVersion="3.0.2",f=b.createElement(c),g=b.getElementsByTagName(c)[0],f.async=1,f.src=("https:"===a.location.protocol?"https://":"http://cdn.")+d,f.id="vs-integration",g.parentNode.insertBefore(f,g)}(window,document,"script","api.virtusize.com/integration/v3.js","vs");
    
    vs.setApiKey("0000000000000000000000000000000000000000");
    vs.addWidget({
        productId: "PRODUCT_ID",
        buttonSelector "BUTTON_SELECTOR",
        productVersion: "PRODUCT_VERSION"
    });
    </script>
    <!-- End Virtusize Integration -->


.. note:: 
    The **PRODUCT_ID** and **PRODUCT_VERSION** product data parameters must be
    dynamic for each product.

.. note:: 
    The **PRODUCT_VERSION** variable can be an integer, a date, or even an unix
    timestamp, as long as it changes when the product measurements change.


JSON format
^^^^^^^^^^^

The feed must return data as valid
`JSON <http://en.wikipedia.org/wiki/JSON>`_.

`Example feed <http://api.virtusize.com/api/v2/feed/examples/json>`_


**Example request:**::

    GET http://www.example.com/product/123456abc/measurements

.. highlight:: javascript

**Example response:**::

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
    Must be same as id used to query.

type
    *required* - String - Product type identifier, in camelCase, refer to
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
    The unit of measurements is configured on a store by store basis, default
    is **centimeters**. (We also support millimeters and inches in decimal
    format) Get in touch with us to configure this for your store.

Please refer to :ref:`label-product-types` for details about measurements for
each product type.


Feed validation
^^^^^^^^^^^^^^^

.. highlight:: html

To validate your feed, you can use our feed tester URL::

    GET http://api.virtusize.com/api/v2/feed/tester/json?apiKey=xxxxxxxxxxxxx&url=http://www.example.com/backend/virtusize/product-info?id=123456abc


Or you can use the Feed tester GUI in our `admin <http://www.virtusize.com/admin/>`_.

