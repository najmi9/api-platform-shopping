<?php

namespace App\Events;

use Symfony\Component\EventDispatcher\EventSubscriberInterface;
use Symfony\Component\HttpKernel\KernelEvents;
use ApiPlatform\Core\EventListener\EventPriorities;
use Symfony\Component\HttpKernel\Event\ViewEvent;
use App\Entity\Order;
use Symfony\Component\Security\Core\Security;
use Doctrine\ORM\EntityManagerInterface;


class SetCartToPaidSubscriber implements EventSubscriberInterface
{

    private $security, $em;

    public function __construct(Security $security, EntityManagerInterface $em )
    {
        $this->security = $security;
        $this->em = $em;
    }

    public static function getSubscribedEvents()
    {
        return [
            KernelEvents::VIEW => ['setCartOrder', EventPriorities::PRE_WRITE]
        ];
    }

    public function setCartOrder(ViewEvent $event)
    {
        $order = $event->getControllerResult();
        $method = $event->getRequest()->getMethod();
        if ($order instanceof Order && $method === "POST") {
            $carts = $order->getCarts();
            $user = $this->security->getUser();
            if ($user) {
                for ($i=0; $i <count($carts) ; $i++) { 
                   $carts[$i]->setPaid(true);
                   $this->em->persist($carts[$i]);  
                }
                $this->em->flush();
            }
        }
    }
}
