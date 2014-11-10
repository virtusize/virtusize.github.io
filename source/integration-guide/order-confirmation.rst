.. highlight:: html

Order Confirmation Integration
------------------------------

The Virtusize order confirmation integration utilises the same small JavaScript 
that will be used on your product pages. You will need to provide Virtusize with certain
information that will be used for your customers to find the right fit on your website 
when using our widget.

This will enable Virtusize to show your consumers the items they have recently
purchased as part of their ‘Purchase History’. They can then select one or more of
these items in their purchase history wardrobe as a reference item to compare with the 
garment they are looking to purchase from your site. 

.. note::
    You can start providing us purchase data as soon as you have received your API
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
others are optional.

A complete example looks like the following::

    <!-- Virtusize Integration -->
    <script>
    !function(a,b,c,d){var e,f,g,h,i,j,k,l,m;for(a.Virtusize=d,a[d]=a[d]||[],a[d].env=null!=a.vsEnv?a.vsEnv:"production",a[d].url=null!=a.vsUrl?a.vsUrl:a.location.host,a.vsEnv=void 0,a.vsUrl=void 0,a[d].methods=["setApiKey","setRegion","setLanguage","setWidgetOverlayColor","addWidget","ready","on","setAvailableSizes","setSizeAliases","addOrder","setUserId"],a[d].factory=function(b){return function(){var c;return c=Array.prototype.slice.call(arguments),c.unshift(b),a[d].push(c),a[d]}},m=a[d].methods,k=0,l=m.length;l>k;k++)f=m[k],a[d][f]=a[d].factory(f);a[d].snippetVersion="3.1.0",i=b.createElement(c),e=b.getElementsByTagName(c)[0],i.async=1,g="/integration/v3.js",h=".virtusize.com"+g,j={production:"api"+h,staging:"staging"+h,local:a[d].url+g+"?source"},i.src="//"+("https:"!==a.location.protocol&&"local"!==a[d].env?"cdn.":"")+j[a[d].env],i.id="vs-integration",e.parentNode.insertBefore(i,e)}(window,document,"script","vs");
    
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
"""""""""""""""""""

region
    *String* - The region identifier as defined by ISO 3166-1
    alpha-2. The region id must be the two-letter ISO-3166 country code as
    defined in http://en.wikipedia.org/wiki/ISO_3166-1_alpha-2

    Example::
        
        region: "DE"


.. _label-line-items-v3:

Line Items
^^^^^^^^^^

Line items represent the actual products that have been purchased.


Required attributes
"""""""""""""""""""

productId
    *String* - The id of the product. This must match the product id used
    during integration on your product page.
    
    Example::

        productId: "external_id_1234"

size
    *String* - The size or size id of the purchased item. This must match the
    size identifiers used in the product database of Virtusize.
    
    Example::

        size: "2128"

imageUrl
    *String* - The URL to a variant specific image of this line item of the
    color and style the item was ordered by the customer. If possible provide
    a high quality image. This will be used to help the customer identify his
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
"""""""""""""""""""

sizeAlias
    *String* - A size alias that will be used to display the size purchased to the
    customer when they open the widget the next time. They will see this item from
    their personal purchase history with the sizeAlias instead of the actual size, if
    this is set. This alias should be set if you use size-ids instead of
    human readable sizes as identifiers.
    
    Example::

        // When the size is not understandable by customers, like:
        size: "2148"
        // Then the sizeAlias can be use to specify what the customer will see for
        // this product in his purchase history the next time they open the widget:
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
    *String* - The gender that this garment is targeting. Must have one of
    these values: "unisex", "male", "female"

    Example::

        gender: "female"


Here is a complete line item object::

    {
        productId: "external_id_1234",
        size: "2128",
        sizeAlias: "Large",
        imageUrl: "http://images.retailer.com/products/sku123/black/image_large.jpg",
        url: "http://www.retailer.com/products/123",
        color: "black",
        gender: "unisex",
        unitPrice: 99.95,
        quantity: 1,
        currency: "EUR"
    }

