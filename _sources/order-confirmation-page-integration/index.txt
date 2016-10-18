.. _label-order-confirmation-page-integration:

Order Confirmation Page Integration
===================================

The Order Confirmation Page Script enables Virtusize to show your customers the
items they have recently purchased as part of their ``Purchase History``, and use
those items to compare with new items they want to buy. The Virtusize order
confirmation integration is the same JavaScript as the one on your product pages.

You can integrate the Order Confirmation Page script before you integrate the
Product Page script. This way your customers will benefit as soon as you integrate
Virtusize on your product pages by having purchase history from their previous
purchases already in place.

Include the Virtusize Script just before the closing ``</body>``.

You need to provide information about the Order and the individual line items
(products) of the order.

A complete example:

.. code-block:: html
   :linenos:

    <!-- Virtusize Integration -->
    <script>
    !(function(a,d,g,b){var c,h,e,f;a.Virtusize=b;a[b]=a[b]||[];a[b].env=null!=a.vsEnv?a.vsEnv:"production";a[b].url=null!=a.vsUrl?a.vsUrl:a.location.host;a.vsEnv=void 0;a.vsUrl=void 0;a[b].methods="setApiKey setRegion setLanguage setWidgetOverlayColor addWidget ready setMobile on setAvailableSizes setSizeAliases addOrder setUserId".split(" ");a[b].factory=function(c){return function(){var d;d=Array.prototype.slice.call(arguments);d.unshift(c);a[b].push(d);return a[b]}};f=a[b].methods;c=0;for(h=f.length;c<h;c++)e=f[c],a[b][e]=a[b].factory(e);a[b].snippetVersion="3.2.2";c=d.createElement(g);d=d.getElementsByTagName(g)[0];c.async=1;c.src={production:"https://cdn.api.virtusize.com/integration/v3.js",staging:"https://cdn.staging.virtusize.com/integration/v3.js",local:"//"+a[b].url+"/integration/v3.source.js"}[a[b].env];c.id="vs-integration";d.parentNode.insertBefore(c,d)})(window,document,"script","vs");

    vs.setApiKey("API_KEY");

    vs.addOrder({
        orderId: "ORDER_ID",
        userId: "USER_ID",
        region: "DE",

        items: [
            {
                productId: "PRODUCT_ID",
                size: "L",
                sizeAlias: "Large",
                url: "http://www.retailer.com/products/PRODUCT_ID",
                imageUrl: "http://images.retailer.com/products/sku_123/black/image1xl.jpg",
                color: "black",
                gender: "female",
                unitPrice: 99.95,
                quantity: 1,
                currency: "EUR"
            }
        ]
    });
    </script>
    <!-- End Virtusize Integration -->


.. _label-order:

Order information
-----------------

.. highlight:: javascript

Order information attributes contain general information about the Order.

Required attributes
^^^^^^^^^^^^^^^^^^^

orderId
    *String* - An id uniquely identifying the order

    Example::

        "ORDER_ID_4321"

userId
    *String* - An anonymous user id uniquely identifying a customer.
    Could be the database id, either plaintext or hashed, or the
    hashed email address of the user.

    Examples::

        // Valid examples
        userId: "62731"
        userId: "2c9a0ad49c90c71c29cf4399e262e095"

        // Invalid examples
        userId: "guest"
        userId: "Anonymous"
        userId: "john@example.com"
        userId: ""
        userId: null


Optional attributes
^^^^^^^^^^^^^^^^^^^

region
    *String* - The region identifier as defined by ISO 3166-1
    alpha-2. The region id must be the two-letter ISO-3166 country code as
    defined in http://en.wikipedia.org/wiki/ISO_3166-1_alpha-2

    Example::

        region: "DE"


.. _label-line-items:

Line Items
----------

Line items represent the actual products that have been purchased.


Required attributes
^^^^^^^^^^^^^^^^^^^

productId
    *String* - The id of the product. This must match the product id used
    during integration on your product page.

    Example::

        productId: "external_id_1234"

size
    *String* - The size or size id of the purchased item. This must match the
    size identifiers used when providing product data to Virtusize.

    Example::

        size: "2128"

imageUrl
    *String* - The URL to a variant specific image of this line item of the
    color and style the item was ordered in by the customer. If possible, provide
    a high quality image. This will be used to help the customer identify their
    previous purchases at a later stage in the Virtusize widget. In case there
    is no variant specific image available, please provide the default product
    image.

    Example::

        imageUrl: "http://images.retailer.com/products/sku123/black/image_large.jpg"

unitPrice
    *Float* - The unit price of this item.

    Examples::

        // Valid examples
        unitPrice: 99.95
        unitPrice: 100.00

        // Invalid examples
        unitPrice: "100.00"
        unitPrice: 100.0005

quantity
    *Integer* - The quantity of this line item for the given color and size.
    If the customer bought different sizes or colors, a separate item has to be
    added for each variant.

    Examples::

        // Valid examples
        quantity: 1
        quantity: 2
        quantity: 10

        // Invalid examples
        quantity: "1"
        quantity: 0.5

currency
    *String* - Three letter currency code as defined in http://en.wikipedia.org/wiki/ISO_4217

    Examples::

        currency: "EUR"
        currency: "USD"
        currency: "GBP"


Optional attributes
^^^^^^^^^^^^^^^^^^^

sizeAlias
    *String* - A size alias that will be used to display the size purchased to the
    customer the next time they open the widget. They will see this item from
    their personal purchase history with the sizeAlias instead of the actual size, if
    this is set. This alias should be set if you use size-ids instead of
    human readable sizes as identifiers.

    Example::

        // When the size is not understandable by customers, like:
        size: "2148"
        // Then the sizeAlias can be use to specify what the customer will see for
        // this product in their purchase history the next time they open the widget:
        sizeAlias: "Large"

url
    *String* - The canonical URL of this product on your online store.

    Example::

        url: "http://www.retailer.com/products/123"

color
    *String* - The color of ordered garment.

    Example::

        color: "black"

gender
    *String* - The gender that this garment is targeting. Must be one of
    these values: "unisex", "male", "female"

    Example::

        gender: "female"
