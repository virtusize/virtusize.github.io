.. _label-find-by-fit:

Find by fit
===========

Find by fit is the latest product by Virtusize, which lets users search for products
by an item they already own. It can work as a standalone product, but is more effective
when combined with the rest of Virtusize product line.


.. _label-quickstart:

Quickstart
----------

Integrating Find by fit on your page is done in three simple steps:

1. Provide a product feed URL - see :ref:`label-fbf-product-feed`.
2. Add a new page with Find by fit integration - see :ref:`label-page-integration`.
3. Update product page integration to support Find by fit - see :ref:`label-product-page`.


.. _label-fbf-product-feed:

Product feed
------------

The product feed is required to add additional product information to Virtusize, mainly
information that might change regularly. This could be a feed you already have, such as an affiliate feed.
Only include products that are available for purchase in the feed.

.. note::
    The product feed must be available online and in CSV, XLS or JSON format.
    It is frequently fetched multiple times every day, to ensure updated data.

The columns listed below don't have to be in specific order or have any special naming; they just need to exist.
The required data is:

Product ID
    The product ID is used to connect the feed product with the one in Virtusize' database.
    See :ref:`label-setting-the-product-id`.

Brand
    Name of product brand.

Product page URL
    Canonical URL to the specific product.

Price
    Regular product price.

Sale price
    Product price, only if there is a difference from regular price.

Available sizes
    Information about which sizes the product is currently available in for purchase.


.. _label-page-integration:

Page integration
----------------

The integration of the Find by fit app is very similar to other Virtusize integrations.
Start by creating a new page on your website and create a link to it.

.. note::
    All :ref:`label-global-settings` can be used with this integration.

The simplest way to integrate is:

.. code-block:: html
   :linenos:

    <!-- Virtusize Integration -->
    <script>
    !(function(a,d,e,b){var f;a.Virtusize=b;a[b]=a[b]||[];a[b].env=null!=a.vsEnv?a.vsEnv:"production";a[b].url=null!=a.vsUrl?a.vsUrl:a.location.host;a.vsEnv=void 0;a.vsUrl=void 0;a[b].methods="setApiKey setRegion setLanguage setWidgetOverlayColor addWidget ready setMobile on setAvailableSizes setSizeAliases addOrder addFindByFit setUserId".split(" ");a[b].factory=function(c){return function(){var d=Array.prototype.slice.call(arguments);d.unshift(c);a[b].push(d);return a[b]}};var g=a[b].methods;var c=0;for(f=g.length;c<f;c++){var h=g[c];a[b][h]=a[b].factory(h)}a[b].snippetVersion="4.1.0";c=d.createElement(e);d=d.getElementsByTagName(e)[0];c.async=1;c.src={production:"https://cdn.api.virtusize.com/integration/v4.js",staging:"https://cdn.staging.virtusize.com/integration/v4.js",japan:"https://cdn.api.virtusize.jp/integration/v4.js",korea:"https://cdn.api.virtusize.kr/integration/v4.js",local:"//"+a[b].url+"/integration/v4.source.js"}[a[b].env];c.id="vs-integration";d.parentNode.insertBefore(c,d)})(window,document,"script","vs");

    vs.setApiKey("API_KEY");
    vs.addFindByFit({
        containerSelector: "CONTAINER_SELECTOR",
        done: function(error) {
            this.on("user-opened-widget", function() {
                // Track interactions
            });
        }
    });
    </script>
    <!-- End Virtusize Integration -->


.. _label-product-page:

Product page
------------

Update the existing :ref:`label-product-page-integration`. The integration provides features
to automatically pre-populate the size selector and display additional information for the user.

Add an empty container element with a custom ID. Then supply the ID as ``FIND_BY_FIT_SELECTOR``
in the code snippet below. The button will only be shown when the user comes from Find by fit.

Update your existing product page integration by adding the lines 10 and 12 from the example:

.. code-block:: html
   :linenos:

    <!-- Virtusize Integration -->
    <script>
    !(function(a,d,e,b){var f;a.Virtusize=b;a[b]=a[b]||[];a[b].env=null!=a.vsEnv?a.vsEnv:"production";a[b].url=null!=a.vsUrl?a.vsUrl:a.location.host;a.vsEnv=void 0;a.vsUrl=void 0;a[b].methods="setApiKey setRegion setLanguage setWidgetOverlayColor addWidget ready setMobile on setAvailableSizes setSizeAliases addOrder addFindByFit setUserId".split(" ");a[b].factory=function(c){return function(){var d=Array.prototype.slice.call(arguments);d.unshift(c);a[b].push(d);return a[b]}};var g=a[b].methods;var c=0;for(f=g.length;c<f;c++){var h=g[c];a[b][h]=a[b].factory(h)}a[b].snippetVersion="4.1.0";c=d.createElement(e);d=d.getElementsByTagName(e)[0];c.async=1;c.src={production:"https://cdn.api.virtusize.com/integration/v4.js",staging:"https://cdn.staging.virtusize.com/integration/v4.js",japan:"https://cdn.api.virtusize.jp/integration/v4.js",korea:"https://cdn.api.virtusize.kr/integration/v4.js",local:"//"+a[b].url+"/integration/v4.source.js"}[a[b].env];c.id="vs-integration";d.parentNode.insertBefore(c,d)})(window,document,"script","vs");

    vs.setApiKey("API_KEY");
    vs.addWidget({
        productId: "PRODUCT_ID",
        buttonSelector: "BUTTON_SELECTOR",
        productImageUrl: "PRODUCT_IMAGE_URL",
        findByFitSelector: "FIND_BY_FIT_SELECTOR",
        done: function(error) {
            this.on("find-by-fit-select-size", function(data) {
             // Handle the event by selecting the appropriate size in the
             // size selector.
             //
             // The additional data contains the size:
             // data == {size: "Small"}
            });
        }
    });
    </script>
    <!-- End Virtusize Integration -->

Line 10
    Specify a container for the Find by fit-button. The button will automatically be
    placed in this container.

Line 12
    Add code to read size from the ``data`` value, being passed as a parameter, and
    pre-select the size in the size selector for the user.

.. note::
    You can test these functions on your product page, by appending ``?vs.cohort=findbyfit&score=95&size=Small``
    to a product page URL.


.. _label-events:

Data tracking - events
----------------------

Event tracking works the same way in all Virtusize integrations.
Listed here, are event names specific for Find by fit.

The following events are supported:

user-opened-widget
    Triggered when the Find by fit widget was opened.

user-opened-panel-select-product-type
    Triggered when the user opens the panel "select product type".

user-opened-panel-new-from-measurements
    Triggered when a user opened the panel "new from measurements".

user-added-product
    Triggered when a user successfully created a new item from
    measurements in the panel "new from measurements".

user-selected-product
    Triggered when the users selects an item for comparison.

user-sorted-store-products
    Triggered when the user changes the result list sort order.
