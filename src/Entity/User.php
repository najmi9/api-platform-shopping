<?php

namespace App\Entity;

use App\Repository\UserRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Security\Core\User\UserInterface;
use ApiPlatform\Core\Annotation\ApiResource;
use Symfony\Component\Serializer\Annotation\Groups;

/**
 * @ORM\Entity(repositoryClass=UserRepository::class)
 * @ApiResource(
 *    itemOperations={"GET","DELETE","PUT"},
 *    collectionOperations={"GET", "POST"},
 *    normalizationContext={"groups"={"user:read"}},
 *    denormalizationContext={"groups"={"user:write"}}
 * )
 */
class User implements UserInterface
{
    /**
     * @ORM\Id()
     * @ORM\GeneratedValue()
     * @ORM\Column(type="integer")
      * @Groups({"user:write", "user:read"})
     * @Groups({"comment:read", "comment-write"})
     * @Groups({"product-comment:read", "order:read"})
     */
    private $id;

    /**
     * @ORM\Column(type="string", length=180, unique=true)
     * @Groups({"user:write", "user:read"})
     * @Groups({"comment:read"})
     * @Groups({"product-comment:read", "order:read"})
     */
    private $username;

    /**
     * @ORM\Column(type="json")
      * @Groups({"user:write", "user:read"})
     * 
     */
    private $roles = [];

    /**
     * @var string The hashed password
     * @ORM\Column(type="string")
      * @Groups({"user:write"})
     */
    private $password;

    /**
     * @ORM\OneToMany(targetEntity=Comment::class, mappedBy="user")
     */
    private $comments;

    /**
     * @ORM\OneToMany(targetEntity=Cart::class, mappedBy="user", orphanRemoval=true)
     */
    private $carts;

    /**
     * @ORM\Column(type="string", length=255)
      * @Groups({"user:write", "user:read", "order:read"})
     */
    private $email;

    /**
     * @ORM\OneToMany(targetEntity=Like::class, mappedBy="user", orphanRemoval=true)
     */
    private $likes;

    /**
     * @ORM\OneToMany(targetEntity=Order::class, mappedBy="user")
     */
    private $orders;

    /**
     * @ORM\ManyToMany(targetEntity=CancledOrder::class, mappedBy="user")
     */
    private $cancledOrders;



    public function __construct()
    {
        $this->comments = new ArrayCollection();
        $this->carts = new ArrayCollection();
        $this->likes = new ArrayCollection();
        $this->orders = new ArrayCollection();
        $this->cancledOrders = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    /**
     * A visual identifier that represents this user.
     *
     * @see UserInterface
     */
    public function getUsername(): string
    {
        return (string) $this->username;
    }

    public function setUsername(string $username): self
    {
        $this->username = $username;

        return $this;
    }

    /**
     * @see UserInterface
     */
    public function getRoles(): array
    {
        $roles = $this->roles;
        // guarantee every user at least has ROLE_USER
        $roles[] = 'ROLE_USER';

        return array_unique($roles);
    }

    public function setRoles(array $roles): self
    {
        $this->roles = $roles;

        return $this;
    }

    /**
     * @see UserInterface
     */
    public function getPassword(): string
    {
        return (string) $this->password;
    }

    public function setPassword(string $password): self
    {
        $this->password = $password;

        return $this;
    }

    /**
     * @see UserInterface
     */
    public function getSalt()
    {
        // not needed when using the "bcrypt" algorithm in security.yaml
    }

    /**
     * @see UserInterface
     */
    public function eraseCredentials()
    {
        // If you store any temporary, sensitive data on the user, clear it here
        // $this->plainPassword = null;
    }

    /**
     * @return Collection|Comment[]
     */
    public function getComments(): Collection
    {
        return $this->comments;
    }

    public function addComment(Comment $comment): self
    {
        if (!$this->comments->contains($comment)) {
            $this->comments[] = $comment;
            $comment->setUser($this);
        }

        return $this;
    }

    public function removeComment(Comment $comment): self
    {
        if ($this->comments->contains($comment)) {
            $this->comments->removeElement($comment);
            // set the owning side to null (unless already changed)
            if ($comment->getUser() === $this) {
                $comment->setUser(null);
            }
        }

        return $this;
    }

    /**
     * @return Collection|Cart[]
     */
    public function getCarts(): Collection
    {
        return $this->carts;
    }

    public function addCart(Cart $cart): self
    {
        if (!$this->carts->contains($cart)) {
            $this->carts[] = $cart;
            $cart->setUser($this);
        }

        return $this;
    }

    public function removeCart(Cart $cart): self
    {
        if ($this->carts->contains($cart)) {
            $this->carts->removeElement($cart);
            // set the owning side to null (unless already changed)
            if ($cart->getUser() === $this) {
                $cart->setUser(null);
            }
        }

        return $this;
    }

    public function getEmail(): ?string
    {
        return $this->email;
    }

    public function setEmail(string $email): self
    {
        $this->email = $email;

        return $this;
    }

    /**
     * @return Collection|Like[]
     */
    public function getLikes(): Collection
    {
        return $this->likes;
    }

    public function addLike(Like $like): self
    {
        if (!$this->likes->contains($like)) {
            $this->likes[] = $like;
            $like->setUser($this);
        }

        return $this;
    }

    public function removeLike(Like $like): self
    {
        if ($this->likes->contains($like)) {
            $this->likes->removeElement($like);
            // set the owning side to null (unless already changed)
            if ($like->getUser() === $this) {
                $like->setUser(null);
            }
        }

        return $this;
    }

    /**
     * @return Collection|Order[]
     */
    public function getOrders(): Collection
    {
        return $this->orders;
    }

    public function addOrder(Order $order): self
    {
        if (!$this->orders->contains($order)) {
            $this->orders[] = $order;
            $order->setUser($this);
        }

        return $this;
    }

    public function removeOrder(Order $order): self
    {
        if ($this->orders->contains($order)) {
            $this->orders->removeElement($order);
            // set the owning side to null (unless already changed)
            if ($order->getUser() === $this) {
                $order->setUser(null);
            }
        }

        return $this;
    }

    /**
     * @return Collection|CancledOrder[]
     */
    public function getCancledOrders(): Collection
    {
        return $this->cancledOrders;
    }

    public function addCancledOrder(CancledOrder $cancledOrder): self
    {
        if (!$this->cancledOrders->contains($cancledOrder)) {
            $this->cancledOrders[] = $cancledOrder;
            $cancledOrder->addUser($this);
        }

        return $this;
    }

    public function removeCancledOrder(CancledOrder $cancledOrder): self
    {
        if ($this->cancledOrders->contains($cancledOrder)) {
            $this->cancledOrders->removeElement($cancledOrder);
            $cancledOrder->removeUser($this);
        }

        return $this;
    }
}
