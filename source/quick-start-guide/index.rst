.. highlight:: html

.. role:: raw-html(raw)
   :format: html

.. _label-quick-start-guide:

Quick Start Guide
-----------------

This quick start guide describes all the steps to integrate Virtusize including
purchase history in a fast and simple way. For more customization options
please check the more detailed sections of the developer documentation.

Before you get started, make sure you have received your **API key** and
**Admin account** credentials. `Contact our sales team
<http://www.virtusize.com/contact>`__, if you have any questions.

Virtusize consists of the following three components:

1. **Product Measurements:** define the sizes and measurements of your products
   in our database.
2. **Product Page Integration:** loads and enables the Virtusize Widget for
   your customers
3. **Order Confirmation Integration:** tracks the purchases of your customers
   to enable purchase history in the widget.


1. Provide your product measurements
====================================

For production environments you can send your spec sheets directly to us. We
will take care of inserting the correct measurements into our database. Feel
free to get in touch with your sales contact or our `sales team
<http://www.virtusize.com/contact>`__ for more details on this.

For testing purposes the easiest way to upload product measurements to
Virtusize is through the Virtusize Admin, which is available on
http://www.virtusize.com/admin.

.. note::

    In this step you set a unique ``PRODUCT_ID`` that you need to reference in
    all the other steps.


2. Integrate on your product pages
==================================

For this step you will need to have the following information to be available:

- Your ``API_KEY``
- The ``PRODUCT_ID`` that you assigned in the previous step
- A ``BUTTON_SELECTOR`` identifying a DOM element on your product page. This
  will open the Virtusize Widget. It should be set to ``visibility:hidden`` or
  ``display:none`` initially and will get shown, if there is a valid product
  for this product id in our database.
- The ``PRODUCT_IMAGE_URL`` that you want to be used in the Virtusize Widget.
  For the best experience you should select an image in portrait orientation,
  i.e.  ``width:360px; height: 500px;``. This image takes precedence over the
  Open Graph image that Virtusize would use as a default image if you don't
  specify this attribute.

Replace the variables in the following snippet with the real values and paste
it onto your product page just before the closing ``</body>`` tag::

    <!-- Virtusize Integration -->
    <script>
    !function(a,b,c,d,e,f,g){var h,i,j,k;for(a.Virtusize=e,a[e]=a[e]||[],a[e].methods=["setApiKey","setRegion","setLanguage","setWidgetOverlayColor","addWidget","ready","on","setAvailableSizes","setSizeAliases","addOrder","setUserId"],a[e].factory=function(b){return function(){var c;return c=Array.prototype.slice.call(arguments),c.unshift(b),a[e].push(c),a[e]}},k=a[e].methods,i=0,j=k.length;j>i;i++)h=k[i],a[e][h]=a[e].factory(h);a[e].snippetVersion="3.0.2",f=b.createElement(c),g=b.getElementsByTagName(c)[0],f.async=1,f.src=("https:"===a.location.protocol?"https://":"http://cdn.")+d,f.id="vs-integration",g.parentNode.insertBefore(f,g)}(window,document,"script","api.virtusize.com/integration/v3.js","vs");

    vs.setApiKey("0000000000000000000000000000000000000000");
    vs.addWidget({
        productId: "PRODUCT_ID",
        buttonSelector: "BUTTON_SELECTOR",
        productImageUrl: "PRODUCT_IMAGE_URL"
    });
    </script>
    <!-- End Virtusize Integration -->


3. Integrate on your order confirmation page
============================================

For this step you will need to have the following information to be available:

.. highlight:: javascript

- Your ``API_KEY``
- The ``ORDER_ID`` uniquely identifying a completed order by your customer
- An anonymous ``USER_ID`` uniquely identifying the customer of this order.
  This could be the hashed email address or the database id of the user::

    // Good examples
    userId: "62731"
    userId: "2c9a0ad49c90c71c29cf4399e262e095"

    // Bad examples
    userId: "guest"
    userId: "Anonymous"
    userId: "john@example.com"
    userId: ""
    userId: null

- The ``PRODUCT_ID`` that was purchased. This needs to be the same id that you
  used in the previous steps.
- The ``SIZE`` that this product was purchased in. This value has to match one
  of the size identifiers that you specified in step 1 for the product
  measurements.
- The ``IMAGE_URL`` that you want the user to see in his purchase history. This
  should preferably be an image of the garment in the color that was actually
  purchased in this order. This image is not used as a product image, but it
  should have the same proportions ``width:360px; height: 500px;``, if
  possible.

.. highlight:: html

Replace the variables in the following snippet with the real values and paste
it onto your order confirmation page just before the closing ``</body>`` tag::

    <!-- Virtusize Order Confirmation -->
    <script>
    !function(a,b,c,d,e,f,g){var h,i,j,k;for(a.Virtusize=e,a[e]=a[e]||[],a[e].methods=["setApiKey","setRegion","setLanguage","setWidgetOverlayColor","addWidget","ready","on","setAvailableSizes","setSizeAliases","addOrder","setUserId"],a[e].factory=function(b){return function(){var c;return c=Array.prototype.slice.call(arguments),c.unshift(b),a[e].push(c),a[e]}},k=a[e].methods,i=0,j=k.length;j>i;i++)h=k[i],a[e][h]=a[e].factory(h);a[e].snippetVersion="3.0.2",f=b.createElement(c),g=b.getElementsByTagName(c)[0],f.async=1,f.src=("https:"===a.location.protocol?"https://":"http://cdn.")+d,f.id="vs-integration",g.parentNode.insertBefore(f,g)}(window,document,"script","api.virtusize.com/integration/v3.js","vs");
    
    vs.setApiKey("0000000000000000000000000000000000000000");

    vs.addOrder({
        orderId: "ORDER_ID",
        userId: "USER_ID",

        items: [
            {
                productId: "PRODUCT_ID",
                size: "SIZE",
                imageUrl: "IMAGE_URL"
            }
        ]
    });
    </script>
    <!-- End Virtusize Order Confirmation -->

.. note::

    If the user purchased multiple sizes of the same garment or different
    garments, you have to add these as additional elements to the ``items``
    array in the snippet.


4. Verify your integration
==========================

You can verify your integration by using our Bookmarklet. Just drag the
following link to your bookmarks bar.

:raw-html:`<a href="javascript:void((function(){var%20element=document.createElement('script');element.setAttribute('src','https://rawgit.com/virtusize/bookmarklets/master/build/override.min.js');element.setAttribute('id','vs-bookmarklet');document.body.appendChild(element)})())" title="Virtusize Bookmarklet" class="fa fa-bookmark">&nbsp;Virtusize Bookmarklet</a>`

When you click this bookmarklet on either your product pages or your order
confirmation page, a little toolbar should appear at the bottom of the page. It
tells you on first glance, if you have integrated correctly.

You can click the *Debug* tab to see, if there are widgets or orders added to
Virtusize on this page. If so, there are additional tabs for inspecting the
details of these items.

