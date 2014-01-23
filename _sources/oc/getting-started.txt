.. highlight:: javascript

Order API
---------

Getting started
^^^^^^^^^^^^^^^

To get started you have to include a script into your order confirmation page.
It is very similar to the integration script you already included on your
product pages.

You supply certain information about the order and the line items of the order.
Some attributes are required for the purchase history to work properly, others
are recommended.

The basic script you have to include looks like the following::

    window.vsOrderConfirmation = function(order) {
        // Set details on the order object here …
    };
    
    /*** Do not change anything below this line!                ***/
    /*** This will load the Virtusize order confirmation script ***/
    (function(d, s){
        var fS = d.getElementsByTagName(s)[0], sE = d.createElement(s),
            p = "https:" == d.location.protocol ? "https://" : "http://cdn.";
        sE.async = true; sE.type = "text/javascript";
        sE.src = p + "api.virtusize.com/order-confirmation/v1.js";
        fS.parentNode.insertBefore(sE, fS);
    }(document, "script"));


Order
^^^^^

The order is the container holding all the information about this purchase. The
object is instantiated by the order confirmation script from Virtusize and
passed as a parameter into the function implemented by the retailer. This is
working the same way as in the integration script. 

Example::
    
    window.vsOrderConfirmation = function(order) {
        // Set details on the order object here …
    };


Required attributes
"""""""""""""""""""

setApiKey(apiKey)
    **apiKey**: *String* - The retailers API key as provided by Virtusize. To
    obtain your API key, please `contact our sales team
    <http://www.virtusize.com/contact>`_.

    Example::

        order.setApiKey('0000000000000000000000000000000000000000');

setOrderId(orderId)
    **orderId**: *String* - An id uniquely identifying the order

    Example::

        order.setOrderId('order-1234');

setUserId(userId)
    **userId**: *String* - An anonymous user id uniquely identifying a customer of the retailer

    Example::

        order.setUserId('user-4321');

addItem(item)
    **item**: *Object* - Add a single line item to this order. There must be at
    least one item present, to be able to benefit from the order confirmation
    script. It can be provided as a single item or as an array.

    See :ref:`label-line-items` for more information.

    Example::

        order.addItem({
            productId: 'external_id_1234',
            size: '2128',
            sizeAlias: 'Large',
            image: 'http://images.retailer.com/products/sku123/black/image_large.jpg',
            variantId: 'sku_123',
            color: 'black',
            gender: 'unisex',
            unitPrice: 99.95,
            quantity: 1
        });


addItems(items)
    **items**: *Array* - Add an array of line item to this order. This is
    a convenience function that can be called instead of calling ``addItem``
    multiple times.

    See :ref:`label-line-items` for more information.

    Example::

        order.addItems([
            {
                productId: 'external_id_1234',
                size: '2128'
            },
            {
                productId: 'external_id_1235',
                size: '3242'
            },
        ]);


Recommended attributes
""""""""""""""""""""""

setRegion(region)
    **region**: *String* - The region identifier as defined by ISO 3166-1
    alpha-2. The region id must be the two-letter ISO-3166 country code as
    defined in http://en.wikipedia.org/wiki/ISO_3166-1_alpha-2

    Example::

        order.setRegion('DE');




.. _label-line-items:

Line Items
^^^^^^^^^^

Line items can be added to an order either by individually calling ``addItem`` or
by calling ``addItems`` with an array of items.


Required attributes
"""""""""""""""""""

productId
    *String* - The id of the product. This must match the product id used
    during integration on the retailers product page.
    
    Example::

        'external_id_1234'

size
    *String* - The size or size id of the purchased item. This must match the
    size identifiers used in the product database of Virtusize.
    
    Example::

        '2128'


Recommended attributes
""""""""""""""""""""""

sizeAlias
    *String* - A size alias that will be used to display the size to the
    customer at a later stage, for example while showing him his personal
    purchase history. It should be set, if the retailer uses size-ids instead of
    human readable sizes as identifiers.
    
    Example::

        'Large'

image
    *String* - The URL to a variant specific image of this line item of the
    color and style the item was ordered by the customer. If possible provide
    a high quality image. This will be used to help the customer identify his
    previous purchases at a later stage in the Virtusize widget.
    
    Example::

        'http://images.retailer.com/products/sku123/black/image_large.jpg'

variantId
    *String* - An id that uniquely identifies a product variant including color
    and size, usually the SKU.

    Example::

        'sku_1234'

color
    *String* - The color of ordered garment.
    
    Example::

        'black'

gender
    *String* - The gender that this garment is targetting. Must have one of
    these values: 'unisex', 'male', 'female'

    Example::

        'female'

unitPrice
    *Float* - The unit price of this item.
    
    Example::

        99.95

quantity
    *Integer* - The quantitiy of this line item for the given color and size.
    If the customer bought different sizes or colors, a separate item has to be
    added for each variant.

    Example::

        1


Here is a complete line item object::

    {
        productId: 'external_id_1234',
        size: '2128',
        sizeAlias: 'Large',
        image: 'http://images.retailer.com/products/sku123/black/image_large.jpg',
        variantId: 'sku_123',
        color: 'black',
        gender: 'unisex',
        unitPrice: 99.95,
        quantity: 1
    }

