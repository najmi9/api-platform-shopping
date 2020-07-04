<?php

namespace App\Events\LikeEvents;

use Symfony\Component\EventDispatcher\EventSubscriberInterface;
use Symfony\Component\HttpKernel\KernelEvents;
use ApiPlatform\Core\EventListener\EventPriorities;
use Symfony\Component\HttpKernel\Event\ViewEvent;
use App\Entity\Like;
use Symfony\Component\Security\Core\Security;
use Symfony\Component\HttpKernel\Exception\BadRequestHttpException;

class IsLikedByUserSubscriber implements EventSubscriberInterface
{
    private $security;

    public function __construct(Security $security)
    {
        $this->security = $security;
    }

    public static function getSubscribedEvents()
    {
        return [
            KernelEvents::VIEW => ['isLiked', EventPriorities::PRE_VALIDATE]
        ];
    }

    public function isLiked(ViewEvent $event)
    {
        $like = $event->getControllerResult();
        $method = $event->getRequest()->getMethod();
        $route = $event->getRequest()->get("_route");
       
        if ($like instanceof Like && $method === "POST" && ($route==="api_likes_POST_collection")) {
            $user = $this->security->getUser();

            foreach ($user->getLikes() as $item) {
             if ($like->getProduct()->getId() === $item->getProduct()->getId()) {
                throw new BadRequestHttpException("vous avez déja aimé ce produit !");                 
             }
            	
            }
            
        }
    }
}

