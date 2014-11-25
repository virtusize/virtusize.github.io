.. _label-providing-measurements:

Providing Measurements
======================

In order for our Widget to correctly visualise different product
sizes, the Widget needs to know the product's measurements.

There are three main ways of providing these measurements to Virtusize:

-  Via the :ref:`label-web-interface`
-  Via :ref:`label-bulk-upload`
-  Via a product :ref:`label-feed`

For a standard integration, the measurements are provided to Virtusize
via the Virtusize admin interface, and the integration snippet only
needs the unique product ID to identify what measurements to use.

.. note:: 
    For the best results, the product id should be an identifier that
    identifies the product regardless of size and color.

No button will be visible on a product page until our integration
snippet can find the measurements for that product.

.. _label-web-interface:

Web Interface
-------------

The basic way of providing measurements is via our web admin.
This can be done to provide measurements one by one.

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

The second way of providing measurements is via the bulk upload, using our
excel template. This option is most suited if you are a medium sized retailer
or single brand store with seasonal collections.

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

If your product measurements and data cannot be provided via the
Virtusize admin, the data can instead be provided by a product feed.
This is very similar to Pricerunner and Kelkoo feeds, but with a focus on
product measurements. The major difference is that in this case, the feed
must only return information about one product, and not a list of products.

The feed is implemented according to the specification details
in this document. This feed option is suitable if you are a large scale store that
has an internal measurement database and can expose this as an API.

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
the ``id`` as well as the ``version`` variables in the product data.

.. highlight:: html

::
    
    <!-- Virtusize Integration -->
    <script>
    !function(a,b,c,d){var e,f,g,h,i,j,k,l,m;for(a.Virtusize=d,a[d]=a[d]||[],a[d].env=null!=a.vsEnv?a.vsEnv:"production",a[d].url=null!=a.vsUrl?a.vsUrl:a.location.host,a.vsEnv=void 0,a.vsUrl=void 0,a[d].methods=["setApiKey","setRegion","setLanguage","setWidgetOverlayColor","addWidget","ready","on","setAvailableSizes","setSizeAliases","addOrder","setUserId"],a[d].factory=function(b){return function(){var c;return c=Array.prototype.slice.call(arguments),c.unshift(b),a[d].push(c),a[d]}},m=a[d].methods,k=0,l=m.length;l>k;k++)f=m[k],a[d][f]=a[d].factory(f);a[d].snippetVersion="3.1.0",i=b.createElement(c),e=b.getElementsByTagName(c)[0],i.async=1,g="/integration/v3.js",h=".virtusize.com"+g,j={production:"api"+h,staging:"staging"+h,local:a[d].url+g+"?source"},i.src="//"+("https:"!==a.location.protocol&&"local"!==a[d].env?"cdn.":"")+j[a[d].env],i.id="vs-integration",e.parentNode.insertBefore(i,e)}(window,document,"script","vs");
    
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
    The **PRODUCT_VERSION** variable can be an integer, a date, or even a unix
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

