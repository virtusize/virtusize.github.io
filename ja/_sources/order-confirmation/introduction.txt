Introduction
------------

Virtusize order confirmation consists of a small JavaScript, that retailer can
include in their order confirmation pages. The retailer will supply Virtusize
with a number of useful information, that is relevant for finding the perfect
size and fit for the customers of the retailer.

This will enable Virtusize to show the customers garments they have recently
purchased as part of the purchase history. They can then select one or more of
these garments as a reference item used for comparison with the garment they
are looking to purchase from the retailer at the moment. Doing this will
effectively eliminate the tedious task of measuring garments from their
wardrobe for the customers and will therefore make it much easier for the
customer to get started with using Virtusize.

.. note::
    You can start providing purchase data as soon as you have received your API
    key. This way your customers will benefit as soon as you integrate
    Virtusize on your product pages. They will already have purchase history
    from their previous purchases in place.


Dependencies
^^^^^^^^^^^^
At this moment, the order confirmation has only one dependency, jQuery 1.3 or
later.  If jQuery is not found on the page, the script will asynchronously load
jQuery from the Google CDN (this will not slow down the page as it is done
asynchronously and most clients already have it cached).


Asynchronous loading
^^^^^^^^^^^^^^^^^^^^
All script loading is done asynchronously, minimizing the impact on the load
speed of the product page. The integration snippet is inspired by the
asynchronous loading done by Google Analytics, FB Connect, Google+ and others.
In the unlikely event of Virtusize servers experiencing down time, the product
page will not be impacted other than that the button won't show.


How it works
^^^^^^^^^^^^
After the order confirmation script loads, it will create one or more tracking
pixels and insert them into the retailers page. That way the given information
will get passed on to Virtusize. Our servers will store the order data and
connect it to the current customer.

