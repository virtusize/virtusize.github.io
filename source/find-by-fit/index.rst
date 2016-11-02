.. _label-find-by-fit:

Find by fit
===========

Find by fit is the latest product by Virtusize, which lets users search for products
by an item they already own. It can work as a standalone product, but is more effective
when combined with the rest of Virtusize product line.


.. _label-integration-steps:

Integration steps
-----------------

Integrating Find by fit on your page can be done in three simple steps:

1. Provide a product feed URL - see :ref:`label-product-feed`.
2. Add a new page with Find by fit integration - see :ref:`label-page-integration`.
3. Update product page integration to support Find by fit - see :ref:`label-product-page`.


.. _label-product-feed:

Product feed
------------

The product feed is required to add additional product information to Virtusize, some of which
might change often. This could be a feed you already have, such as an affiliate feed.

.. note::
    The product feed must be available online and in CSV, XLS or JSON format.
    The feed is frequantly fetched multiple times every day, to ensure updated data.

The list below doesn't be in specific order or any special naming. The required data is:

Product ID
    The product ID is used to connect the feed product with the one in Virtusize' database.
    See :ref:`label-setting-the-product-id`.

Brand
    Product brand name.

Product page URL
    Direct URL to the specific product.

Price
    Regular product price.

Sale price
    Product price, only if there's a difference from regular price.

Available sizes
    Information about which sizes the product is available in.


.. _label-page-integration:

Page integration
----------------

The integration of the Find by fit app is very similar to other Virtusize integrations.

.. note::
    All :ref:`label-global-settings` can be used with this integration.

The simplest way to integrate is:

.. code-block:: html
   :linenos:

    <!-- Virtusize Integration -->
    <script>
    !(function(a,d,g,b){var c,h,e,f;a.Virtusize=b;a[b]=a[b]||[];a[b].env=null!=a.vsEnv?a.vsEnv:"production";a[b].url=null!=a.vsUrl?a.vsUrl:a.location.host;a.vsEnv=void 0;a.vsUrl=void 0;a[b].methods="setApiKey setRegion setLanguage setWidgetOverlayColor addWidget ready setMobile on setAvailableSizes setSizeAliases addOrder setUserId".split(" ");a[b].factory=function(c){return function(){var d;d=Array.prototype.slice.call(arguments);d.unshift(c);a[b].push(d);return a[b]}};f=a[b].methods;c=0;for(h=f.length;c<h;c++)e=f[c],a[b][e]=a[b].factory(e);a[b].snippetVersion="3.2.2";c=d.createElement(g);d=d.getElementsByTagName(g)[0];c.async=1;c.src={production:"https://cdn.api.virtusize.com/integration/v3.js",staging:"https://cdn.staging.virtusize.com/integration/v3.js",local:"//"+a[b].url+"/integration/v3.source.js"}[a[b].env];c.id="vs-integration";d.parentNode.insertBefore(c,d)})(window,document,"script","vs");

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
to automatically pre-select the chosen size and display additional information for the user.

Note the extra lines 10 and 12:

.. code-block:: html
   :linenos:

    <!-- Virtusize Integration -->
    <script>
    !(function(a,d,g,b){var c,h,e,f;a.Virtusize=b;a[b]=a[b]||[];a[b].env=null!=a.vsEnv?a.vsEnv:"production";a[b].url=null!=a.vsUrl?a.vsUrl:a.location.host;a.vsEnv=void 0;a.vsUrl=void 0;a[b].methods="setApiKey setRegion setLanguage setWidgetOverlayColor addWidget ready setMobile on setAvailableSizes setSizeAliases addOrder setUserId".split(" ");a[b].factory=function(c){return function(){var d;d=Array.prototype.slice.call(arguments);d.unshift(c);a[b].push(d);return a[b]}};f=a[b].methods;c=0;for(h=f.length;c<h;c++)e=f[c],a[b][e]=a[b].factory(e);a[b].snippetVersion="3.2.2";c=d.createElement(g);d=d.getElementsByTagName(g)[0];c.async=1;c.src={production:"https://cdn.api.virtusize.com/integration/v3.js",staging:"https://cdn.staging.virtusize.com/integration/v3.js",local:"//"+a[b].url+"/integration/v3.source.js"}[a[b].env];c.id="vs-integration";d.parentNode.insertBefore(c,d)})(window,document,"script","vs");

    vs.setApiKey("API_KEY");
    vs.addWidget({
        productId: "PRODUCT_ID",
        buttonSelector: "BUTTON_SELECTOR",
        productImageUrl: "PRODUCT_IMAGE_URL",
        findByFitSelector: "FIND_BY_FIT_SELECTOR",
        done: function(error) {
            this.on("find-by-fit-select-size", function(size) {

            });
        }
    });
    </script>
    <!-- End Virtusize Integration -->

Line 10
    Specify a container for the Find by fit-button. The button will automatically be
    placed in this container.

Line 12
    Add code to read the ``size`` value, being passed as a parameter, and pre-select
    the size for the user.

.. note::
    You can test these functions on your product page, by appending ``?vs.cohort=findbyfit&score=95&size=Small`` to
    a product page URL.


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
