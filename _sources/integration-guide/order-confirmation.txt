.. highlight:: html

Order Confirmation Integration
------------------------------

Virtusize order confirmation utilizes the same small JavaScript that is used on
the product pages. The retailer will provide Virtusize with a number of useful
information, that is relevant for finding the perfect size and fit for the
customers of the retailer.

This will enable Virtusize to show the customers items they have recently
purchased as part of the purchase history. They can then select one or more of
these items as a reference item used for comparison with the garment they are
looking to purchase from the retailer at the moment. Doing this will
effectively eliminate the tedious task of measuring garments from their
wardrobe for the customers and will therefore make it much easier for the
customer to get started with using Virtusize.

.. note::
    You can start providing purchase data as soon as you have received your API
    key. This way your customers will benefit as soon as you integrate
    Virtusize on your product pages by having purchase history from their
    previous purchases already in place.


Getting started
^^^^^^^^^^^^^^^

To get started you have to include the Virtusize integration script into your
order confirmation page just before the closing ``</body>``. This is the same
script that you use on your product pages.

You provide certain information about the order and the line items of the
order. Some attributes are required for the purchase history to work properly,
others are recommended.

A complete example looks like the following::

    <!-- Virtusize Integration -->
    <script>
    !function(a,b,c,d,e,f,g){var h,i,j,k;for(a.Virtusize=e,a[e]=a[e]||[],a[e].methods=["setApiKey","setRegion","setLanguage","setWidgetOverlayColor","addWidget","ready","on","setAvailableSizes","setSizeAliases","addOrder","setUserId"],a[e].factory=function(b){return function(){var c;return c=Array.prototype.slice.call(arguments),c.unshift(b),a[e].push(c),a[e]}},k=a[e].methods,i=0,j=k.length;j>i;i++)h=k[i],a[e][h]=a[e].factory(h);a[e].snippetVersion="3.0.2",f=b.createElement(c),g=b.getElementsByTagName(c)[0],f.async=1,f.src=("https:"===a.location.protocol?"https://":"http://cdn.")+d,f.id="vs-integration",g.parentNode.insertBefore(f,g)}(window,document,"script","api.virtusize.com/integration/v3.js","vs");
    
    vs.setApiKey("0000000000000000000000000000000000000000");

    vs.addOrder({
        orderId: "ORDER_ID",
        userId: "USER_ID",
        region: "DE",

        items: [
            {
                productId: "PRODUCT_ID",
                size: "L",
                sizeAlias: "Large",
                variantId: "SKU_123",
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


Order
^^^^^

.. highlight:: javascript

An order contains general information about this purchase as well as a list of
line items.

Required attributes
"""""""""""""""""""

orderId
    *String* - An id uniquely identifying the order

    Example::

        "ORDER_ID_4321"

userId
    *String* - An anonymous user id uniquely identifying a customer of the
    retailer. Could be the database id, either plaintext or hashed, or the
    hashed email address of the user.

    Examples::

        // Good examples
        userId: "62731"
        userId: "2c9a0ad49c90c71c29cf4399e262e095"

        // Bad examples
        userId: "guest"
        userId: "Anonymous"
        userId: "john@example.com"
        userId: ""
        userId: null


Recommended attributes
""""""""""""""""""""""

region
    *String* - The region identifier as defined by ISO 3166-1
    alpha-2. The region id must be the two-letter ISO-3166 country code as
    defined in http://en.wikipedia.org/wiki/ISO_3166-1_alpha-2

    Example::
        
        "DE"


.. _label-line-items-v3:

Line Items
^^^^^^^^^^

Line items represent the actual products that have been purchased.


Required attributes
"""""""""""""""""""

productId
    *String* - The id of the product. This must match the product id used
    during integration on the retailers product page.
    
    Example::

        "external_id_1234"

size
    *String* - The size or size id of the purchased item. This must match the
    size identifiers used in the product database of Virtusize.
    
    Example::

        "2128"

imageUrl
    *String* - The URL to a variant specific image of this line item of the
    color and style the item was ordered by the customer. If possible provide
    a high quality image. This will be used to help the customer identify his
    previous purchases at a later stage in the Virtusize widget. In case there
    is no variant specific image available, please provide the default product
    image.
    
    Example::

        "http://images.retailer.com/products/sku123/black/image_large.jpg"


Recommended attributes
""""""""""""""""""""""

sizeAlias
    *String* - A size alias that will be used to display the size to the
    customer at a later stage, for example while showing him his personal
    purchase history. It should be set, if the retailer uses size-ids instead of
    human readable sizes as identifiers.
    
    Example::

        "Large"

url
    *String* - The canonical URL of this product in the retailers online store.
    
    Example::

        "http://www.retailer.com/products/123"

variantId
    *String* - An id that uniquely identifies a product variant including color
    and size, usually the SKU.

    Example::

        "sku_1234"

color
    *String* - The color of ordered garment.
    
    Example::

        "black"

gender
    *String* - The gender that this garment is targetting. Must have one of
    these values: "unisex", "male", "female"

    Example::

        "female"

unitPrice
    *Float* - The unit price of this item.
    
    Examples::
        
        // Good examples
        99.95
        100.00

        // Bad examples
        "100.00"
        100.0005

quantity
    *Integer* - The quantitiy of this line item for the given color and size.
    If the customer bought different sizes or colors, a separate item has to be
    added for each variant.

    Examples::

        // Good examples
        1
        2
        10

        // Bad examples
        "1"
        0.5


Here is a complete line item object::

    {
        productId: "external_id_1234",
        size: "2128",
        sizeAlias: "Large",
        imageUrl: "http://images.retailer.com/products/sku123/black/image_large.jpg",
        url: "http://www.retailer.com/products/123",
        variantId: "sku_123",
        color: "black",
        gender: "unisex",
        unitPrice: 99.95,
        quantity: 1
    }

