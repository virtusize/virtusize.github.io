.. highlight:: html

.. role:: raw-html(raw)
   :format: html

.. _label-quick-start-guide:

Quick Start
-----------

Virtusize provides a JavaScript API for you to integrate on your website and
various ways for you to submit product measurements.

On your order confirmation page you need to include one little Javascript snippet
to provide information to Virtusize about each item that is purchased.
On your product pages you have to provide product details in a similar way to
another snippet. This enables a custom button to launch the Virtusize widget 
on your product pages as soon as the product measurements have been added to our database.

This quick start guide describes all the necessary steps required to integrate Virtusize,
including purchase history. For more detailed customisation options, please check the additional 
sections of our developer documentation.

Before you get started, make sure you have received your **API key** and
**Admin account** credentials. `Contact our sales team
<http://www.virtusize.com/contact>`__, if you have any questions.

The following three steps will enable Virtusize on your website:

1. **Order Confirmation Integration:** tracks your customer’s purchases
   and enables purchase history in the widget by setting order details through
   a JavaScript snippet.
2. **Product Measurements:** define the sizes and measurements of your products
   in our database.
3. **Product Page Integration:** loads and enables the Virtusize Widget for
   your customers by setting some product details through a JavaScript snippet.

1. Integrate on your order confirmation page
============================================

You need to provide certain information to our JavaScript snippet on your order
confirmation page to let Virtusize know of the order details for each purchase. 
This enables us to present personal purchase history to your customers when they 
reopen the Virtusize widget.

For this step you will need to make the following information available:

.. highlight:: javascript

- Your ``API_KEY``
- The ``ORDER_ID`` uniquely identifying a completed order by your customer
- An anonymous ``USER_ID`` uniquely identifying the customer of this order.
  This could be the hashed email address or the database id of the user::

    // Valid examples
    userId: "62731"
    userId: "2c9a0ad49c90c71c29cf4399e262e095"

    // Invalid examples
    userId: "guest"
    userId: "Anonymous"
    userId: "john@example.com"
    userId: ""
    userId: null

- The ``PRODUCT_ID`` that was purchased. (See the note below)
- The ``SIZE`` that this product was purchased in. This value has to match one
  of the size identifiers that you will specify in step 2 for the product
  measurements.
- The ``IMAGE_URL`` that you want the user to see in their purchase history. This
  should preferably be an image of the garment in the colour that is actually
  purchased for the order. This image is not used as a product image, but it
  should have the same proportions ``width:360px; height: 500px;``, if
  possible.
- The unitPrice of this item.
- The quantity of this line item for the given colour and size. If your customer
  has bought different sizes or colours, a separate item has to be added for each
  variant.
- The three letter currency code as defined in
  http://en.wikipedia.org/wiki/ISO_4217 specifying the currency of the
  unitPrice.

.. note::
    
    You will create products in Virtusize’s database by providing measurements in
    step 2. The ``PRODUCT_ID`` you use there is the one you need to reference
    every time you interact with our system. If you integrate the order
    confirmation script first, make sure you use the same product ids for
    providing measurements later on.


.. highlight:: html

Replace the variables in the following snippet with the real values and paste
it onto your order confirmation page just before the closing ``</body>`` tag::

    <!-- Virtusize Order Confirmation -->
    <script>
    !function(a,b,c,d){var e,f,g,h,i,j,k,l,m;for(a.Virtusize=d,a[d]=a[d]||[],a[d].env=null!=a.vsEnv?a.vsEnv:"production",a[d].url=null!=a.vsUrl?a.vsUrl:a.location.host,a.vsEnv=void 0,a.vsUrl=void 0,a[d].methods=["setApiKey","setRegion","setLanguage","setWidgetOverlayColor","addWidget","ready","setMobile","on","setAvailableSizes","setSizeAliases","addOrder","setUserId"],a[d].factory=function(b){return function(){var c;return c=Array.prototype.slice.call(arguments),c.unshift(b),a[d].push(c),a[d]}},m=a[d].methods,k=0,l=m.length;l>k;k++)f=m[k],a[d][f]=a[d].factory(f);a[d].snippetVersion="3.2.0",i=b.createElement(c),e=b.getElementsByTagName(c)[0],i.async=1,g="/integration/v3.js",h=".virtusize.com"+g,j={production:"api"+h,staging:"staging"+h,local:a[d].url+g+"?source"},i.src="//"+("https:"!==a.location.protocol&&"local"!==a[d].env?"cdn.":"")+j[a[d].env],i.id="vs-integration",e.parentNode.insertBefore(i,e)}(window,document,"script","vs");
    
    vs.setApiKey("0000000000000000000000000000000000000000");

    vs.addOrder({
        orderId: "ORDER_ID",
        userId: "USER_ID",

        items: [
            {
                productId: "PRODUCT_ID",
                size: "SIZE",
                imageUrl: "IMAGE_URL",
                unitPrice: 99.95,
                quantity: 1,
                currency: "EUR"
            }
        ]
    });
    </script>
    <!-- End Virtusize Order Confirmation -->

.. note::

    If the user purchased multiple sizes of the same garment or different
    garments, you have to add these as additional elements to the ``items``
    array in the snippet.


2. Provide your product measurements
====================================

For production environments you can send your spec sheets directly to us. We
will take care of inserting the correct measurements into our database. Feel
free to get in touch with your sales contact or our `sales team
<http://www.virtusize.com/contact>`__ for more details on this.

For testing purposes, the easiest way to upload product measurements to
Virtusize is through the Virtusize Admin, which is available on
http://www.virtusize.com/admin. A bulk upload option that enables you to upload
an Excel file containing the product measurements is available as well.

.. note::

    In this step you set a unique ``PRODUCT_ID`` that you need to reference in
    step 1 and step 3.


3. Integrate on your product pages
==================================

You need to provide some information to our JavaScript snippet on your product
pages to configure the Virtusize widget to be able to load.

For this step you will need to make the following information to be available:

- Your ``API_KEY``
- The ``PRODUCT_ID`` that you assigned in the previous step by providing
  measurements.
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
    !function(a,b,c,d){var e,f,g,h,i,j,k,l,m;for(a.Virtusize=d,a[d]=a[d]||[],a[d].env=null!=a.vsEnv?a.vsEnv:"production",a[d].url=null!=a.vsUrl?a.vsUrl:a.location.host,a.vsEnv=void 0,a.vsUrl=void 0,a[d].methods=["setApiKey","setRegion","setLanguage","setWidgetOverlayColor","addWidget","ready","setMobile","on","setAvailableSizes","setSizeAliases","addOrder","setUserId"],a[d].factory=function(b){return function(){var c;return c=Array.prototype.slice.call(arguments),c.unshift(b),a[d].push(c),a[d]}},m=a[d].methods,k=0,l=m.length;l>k;k++)f=m[k],a[d][f]=a[d].factory(f);a[d].snippetVersion="3.2.0",i=b.createElement(c),e=b.getElementsByTagName(c)[0],i.async=1,g="/integration/v3.js",h=".virtusize.com"+g,j={production:"api"+h,staging:"staging"+h,local:a[d].url+g+"?source"},i.src="//"+("https:"!==a.location.protocol&&"local"!==a[d].env?"cdn.":"")+j[a[d].env],i.id="vs-integration",e.parentNode.insertBefore(i,e)}(window,document,"script","vs");

    vs.setApiKey("0000000000000000000000000000000000000000");
    vs.addWidget({
        productId: "PRODUCT_ID",
        buttonSelector: "BUTTON_SELECTOR",
        productImageUrl: "PRODUCT_IMAGE_URL",
        done: function(error) {
            this.on("user-opened-panel-compare", function() {
                // This callback will get called, when a User
                // actually compares an item. Use this to detect
                // real Virtusize uses.
            });
        }
    });
    </script>
    <!-- End Virtusize Integration -->


You might have noticed the example callback within the ``done`` function. For
more information about this topic click here:
:ref:`label-events-and-callbacks-v3`


4. Verify your integration
==========================

You can verify your integration by using our Bookmarklet. Just drag the
following link to your bookmarks bar.

:raw-html:`<a href="javascript:void((function(){var%20element=document.createElement('script');element.setAttribute('src','https://rawgit.com/virtusize/bookmarklets/master/build/override.min.js');element.setAttribute('id','vs-bookmarklet');document.body.appendChild(element)})())" title="Virtusize Bookmarklet" class="fa fa-bookmark">&nbsp;Virtusize Bookmarklet</a>`

When you click this bookmarklet on either your product pages or your order
confirmation page, a little toolbar should appear at the bottom of the page. It
tells you at first glance if you have integrated correctly.

You can click the *Debug* tab to see if there are widgets or orders added to
Virtusize on this page. There are also additional tabs for inspecting the
details of these items.

For any additional questions, please feel to reach out to our at client.support@virtusize.com

